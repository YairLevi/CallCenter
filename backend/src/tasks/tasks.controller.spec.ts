import { Test, TestingModule } from '@nestjs/testing'
import { CallsController } from '../calls/calls.controller'
import { CallsService } from '../calls/calls.service'
import { TagsController } from '../tags/tags.controller'
import { TagsService } from '../tags/tags.service'
import * as request from 'supertest'
import { INestApplication, HttpStatus } from '@nestjs/common'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Call } from '../calls/calls.model'
import { Tag } from '../tags/tags.model'
import { Task } from './tasks.model'

let mongod: MongoMemoryServer
let mongoUri: string

async function connectToTestDB() {
  mongod = await MongoMemoryServer.create()
  mongoUri = mongod.getUri()
  return mongoUri
}

async function closeTestDB() {
  await mongod.stop()
}

describe('Tasks Integration via CallsController', () => {
  let app: INestApplication

  beforeAll(async () => {
    const uri = await connectToTestDB()
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Call.name, schema: SchemaFactory.createForClass(Call) }]),
        MongooseModule.forFeature([{ name: Tag.name, schema: SchemaFactory.createForClass(Tag) }]),
        MongooseModule.forFeature([{ name: Task.name, schema: SchemaFactory.createForClass(Task) }])
      ],
      controllers: [CallsController, TagsController],
      providers: [CallsService, TagsService]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app?.close()
    await closeTestDB()
  })

  let callId: string

  beforeEach(async () => {
    const response = await request(app.getHttpServer())
      .post('/calls')
      .send({ name: 'Test Call' })
      .expect(HttpStatus.CREATED)
    callId = response.body.id
  })

  it('POST /calls/:id/tasks - should add a task to the call', async () => {
    await request(app.getHttpServer())
      .post(`/calls/${callId}/tasks`)
      .send({ name: 'Follow up with client' })
      .expect(HttpStatus.CREATED)

    const getResponse = await request(app.getHttpServer())
      .get(`/calls/${callId}`)
      .expect(HttpStatus.OK)

    expect(getResponse.body.tasks).toHaveLength(1)
    expect(getResponse.body.tasks[0].name).toBe('Follow up with client')
    expect(getResponse.body.tasks[0].status).toBe('Open')
    expect(getResponse.body.tasks[0].id).toBeDefined()
  })

  it('PUT /calls/:id/tasks - should change task status', async () => {
    const addResponse = await request(app.getHttpServer())
      .post(`/calls/${callId}/tasks`)
      .send({ name: 'Review contract' })
      .expect(HttpStatus.CREATED)

    console.log(addResponse.body)
    const taskId = addResponse.body.tasks[0].id

    await request(app.getHttpServer())
      .put(`/calls/${callId}/tasks`)
      .send({ id: taskId, status: 'In Progress' })
      .expect(HttpStatus.OK)

    const getResponse = await request(app.getHttpServer())
      .get(`/calls/${callId}`)
      .expect(HttpStatus.OK)

    const updatedTask = getResponse.body.tasks.find(t => t.id === taskId)
    expect(updatedTask.status).toBe('In Progress')
  })

  it('POST /calls/:id/tasks - should add multiple tasks and all appear correctly', async () => {
    const tasksToAdd = [
      { name: 'Send proposal' },
      { name: 'Schedule meeting' },
      { name: 'Collect feedback' }
    ]

    for (const task of tasksToAdd) {
      await request(app.getHttpServer())
        .post(`/calls/${callId}/tasks`)
        .send(task)
        .expect(HttpStatus.CREATED)
    }

    const getResponse = await request(app.getHttpServer())
      .get(`/calls/${callId}`)
      .expect(HttpStatus.OK)

    expect(getResponse.body.tasks).toHaveLength(3)
    expect(getResponse.body.tasks.map(t => t.name)).toEqual(
      expect.arrayContaining(tasksToAdd.map(t => t.name))
    )
    expect(getResponse.body.tasks.every(t => t.status === 'Open')).toBe(true)
    expect(getResponse.body.tasks.every(t => typeof t.id === 'string')).toBe(true)
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { CallsController } from './calls.controller'
import { CallsService } from './calls.service'
import { TagsController } from '../tags/tags.controller'
import { TagsService } from '../tags/tags.service'
import * as request from 'supertest'
import { INestApplication, HttpStatus } from '@nestjs/common'
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Call } from './calls.model'
import { Tag } from '../tags/tags.model'
import { Task } from '../tasks/tasks.model'

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

describe('CallsController & TagsController (Integration Tests)', () => {
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

  it('/calls (GET) - should return empty array initially', async () => {
    const response = await request(app.getHttpServer())
      .get('/calls')
      .expect(HttpStatus.OK)

    expect(response.body).toEqual([])
  })

  let createdCallId: string

  it('/calls (POST) - should create a call and return correct name and empty arrays', async () => {
    const createDto = { name: 'Alice Johnson' }

    const response = await request(app.getHttpServer())
      .post('/calls')
      .send(createDto)
      .expect(HttpStatus.CREATED)

    expect(response.body.name).toBe('Alice Johnson')
    expect(response.body.tags).toEqual([])
    expect(response.body.tasks).toEqual([])
    expect(response.body.id).toBeDefined()

    createdCallId = response.body.id
  })

  it('/calls/:id (GET) - should retrieve the created call by ID', async () => {
    const response = await request(app.getHttpServer())
      .get(`/calls/${createdCallId}`)
      .expect(HttpStatus.OK)

    expect(response.body.id).toBe(createdCallId)
    expect(response.body.name).toBe('Alice Johnson')
    expect(response.body.tags).toEqual([])
    expect(response.body.tasks).toEqual([])
  })

  let createdTagId: string

  it('/tags (POST) - should create a new tag', async () => {
    const response = await request(app.getHttpServer())
      .post('/tags')
      .send({ name: 'Priority' })
      .expect(HttpStatus.CREATED)

    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe('Priority')
    createdTagId = response.body.id
  })

  it('/calls/:id/tags (PUT) - should assign tag to call and reflect in fetched call', async () => {
    await request(app.getHttpServer())
      .put(`/calls/${createdCallId}/tags`)
      .send({ tagID: createdTagId })
      .expect(HttpStatus.OK)

    const getCallResponse = await request(app.getHttpServer())
      .get(`/calls/${createdCallId}`)
      .expect(HttpStatus.OK)

    expect(getCallResponse.body.tags).toHaveLength(1)
    expect(getCallResponse.body.tags[0].id).toBe(createdTagId)
    expect(getCallResponse.body.tags[0].name).toBe('Priority')
  })

  it('/tags/:id (PUT) - should rename tag and update name in associated call', async () => {
    await request(app.getHttpServer())
      .put(`/tags/${createdTagId}`)
      .send({ name: 'High Priority' })
      .expect(HttpStatus.OK)

    const getCallResponse = await request(app.getHttpServer())
      .get(`/calls/${createdCallId}`)
      .expect(HttpStatus.OK)

    expect(getCallResponse.body.tags).toHaveLength(1)
    expect(getCallResponse.body.tags[0].id).toBe(createdTagId)
    expect(getCallResponse.body.tags[0].name).toBe('High Priority')
  })
})

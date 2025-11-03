import { Test, TestingModule } from '@nestjs/testing';
import { CallsController } from './calls.controller';
import { CallsService } from './calls.service';
import * as request from 'supertest';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Call } from './calls.model';
import { CreateCallDTO, UpdateCallDTO } from './calls.dto';

// --- Setup MongoMemoryServer for isolated testing ---

let mongod: MongoMemoryServer;
let mongoUri: string;

// Function to initialize the in-memory database
async function connectToTestDB() {
  mongod = await MongoMemoryServer.create();
  mongoUri = mongod.getUri();
  return mongoUri;
}

// Function to close and stop the in-memory database
async function closeTestDB() {
  await mongod.stop();
}

// --- Mock DTOs for testing ---
const mockCreateDto: CreateCallDTO = {
  name: 'John Doe',
};

const mockUpdateDto: UpdateCallDTO = {
  name: 'my updated name'
};


describe('CallsController (Integration Test with MongoDB)', () => {
  let app: INestApplication;

  // 1. Setup and Teardown the Test Database
  beforeAll(async () => {
    // 1. Connect to the in-memory database
    const uri = await connectToTestDB();

    // 2. Compile the testing module
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        // Connect to the in-memory database URI
        MongooseModule.forRoot(uri),
        // Import the necessary Mongoose Schemas/Models
        MongooseModule.forFeature([{ name: Call.name, schema: SchemaFactory.createForClass(Call) }]),
      ],
      controllers: [CallsController],
      providers: [CallsService], // Use the real service for integration
    }).compile();

    // 3. Initialize the NestJS application
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // Close the NestJS app and stop the in-memory database
    await app?.close();
    await closeTestDB();
  });

  // --- Test Suite for /calls (POST, GET, PUT, DELETE) ---

  let createdCallId: string;

  // Test POST /calls
  it('/calls (POST) - should create a new call', async () => {
    const response = await request(app.getHttpServer())
      .post('/calls')
      .send(mockCreateDto)
      .expect(HttpStatus.CREATED);

    expect(response.body).toBeDefined();
    expect(response.body.callerName).toBe(mockCreateDto.name);
    expect(response.body._id).toBeDefined();

    // Save the ID for subsequent tests
    createdCallId = response.body._id;
  });

  // Test GET /calls
  it('/calls (GET) - should return an array of calls', async () => {
    const response = await request(app.getHttpServer())
      .get('/calls')
      .expect(HttpStatus.OK);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
    expect(response.body[0]._id).toBe(createdCallId);
  });

  // Test PUT /calls/:id
  it('/calls/:id (PUT) - should update the call', async () => {
    const response = await request(app.getHttpServer())
      .put(`/calls/${createdCallId}`)
      .send(mockUpdateDto)
      .expect(HttpStatus.OK);

    expect(response.body).toBeDefined();
    expect(response.body._id).toBe(createdCallId);
  });

  // Test DELETE /calls/:id
  it('/calls/:id (DELETE) - should delete the call and return 204 NO_CONTENT', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/calls/${createdCallId}`)
      .expect(HttpStatus.NO_CONTENT); // Checks for 204

    // Ensure the response body is empty or nearly empty for 204
    expect(response.body).toEqual({});
    expect(response.text).toBe('');
  });

  // Test GET /calls after deletion (should be empty)
  it('/calls (GET) - should be empty after deletion', async () => {
    const response = await request(app.getHttpServer())
      .get('/calls')
      .expect(HttpStatus.OK);

    expect(response.body.length).toBe(0);
  });
});

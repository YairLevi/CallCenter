import { Module } from '@nestjs/common';
import { CallsModule } from './calls/calls.module';
import { MongooseModule } from "@nestjs/mongoose";
import { TagsModule } from './tags/tags.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/development_db'),
    CallsModule,
    TagsModule,
    TasksModule,
  ],
})
export class AppModule {}

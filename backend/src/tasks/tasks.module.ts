import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { Task } from "./tasks.model";

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: SchemaFactory.createForClass(Task) }])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}

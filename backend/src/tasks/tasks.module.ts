import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { Task } from "./tasks.model";
import { CallsModule } from "../calls/calls.module";
import { CallAssignmentService } from "../core/call-core.service";
import { CallCoreModule } from "../core/call-core.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: SchemaFactory.createForClass(Task) }]),
    CallCoreModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}

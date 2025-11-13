import { CallAssignmentService } from "./call-core.service";
import { Module } from "@nestjs/common";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { Task } from "../tasks/tasks.model";
import { Call } from "../calls/calls.model";
import { SuggestedTask } from "../suggested-tasks/suggested-tasks.model";

@Module({
  imports: [MongooseModule.forFeature([
    { name: Task.name, schema: SchemaFactory.createForClass(Task) },
    { name: Call.name, schema: SchemaFactory.createForClass(Call) },
    { name: SuggestedTask.name, schema: SchemaFactory.createForClass(SuggestedTask) },
  ])],
  providers: [CallAssignmentService],
  exports: [CallAssignmentService],
})
export class CallCoreModule {}

import { Module } from '@nestjs/common';
import { SuggestedTasksService } from './suggested-tasks.service';
import { SuggestedTasksController } from './suggested-tasks.controller';
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { SuggestedTask } from "./suggested-tasks.model";
import { CallsModule } from "../calls/calls.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SuggestedTask.name, schema: SchemaFactory.createForClass(SuggestedTask) }]),
    CallsModule
  ],
  providers: [
    SuggestedTasksService,
  ],
  controllers: [SuggestedTasksController]
})
export class SuggestedTasksModule {}

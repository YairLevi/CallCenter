import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { Tag } from "./tags.model";
import { CallsModule } from "../calls/calls.module";
import { SuggestedTasksModule } from "../suggested-tasks/suggested-tasks.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: SchemaFactory.createForClass(Tag) }]),
    CallsModule,
    SuggestedTasksModule
  ],
  providers: [TagsService],
  controllers: [TagsController]
})
export class TagsModule {}

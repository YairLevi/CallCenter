import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { Tag } from "./tags.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: SchemaFactory.createForClass(Tag) }]),
  ],
  providers: [TagsService],
  controllers: [TagsController]
})
export class TagsModule {}

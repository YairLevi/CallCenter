import { Module } from '@nestjs/common';
import { CallsModule } from './calls/calls.module';
import { MongooseModule } from "@nestjs/mongoose";
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/development_db'),
    CallsModule,
    TagsModule,
  ],
})
export class AppModule {}

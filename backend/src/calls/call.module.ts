import { Module } from '@nestjs/common';
import { CallController } from "./call.controller";
import { CallService } from "./call.service";
import { Call } from "./call.model";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Call.name, schema: SchemaFactory.createForClass(Call) }]),
  ],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule {}

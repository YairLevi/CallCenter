import { Module } from '@nestjs/common';
import { CallsController } from "./calls.controller";
import { CallsService } from "./calls.service";
import { Call } from "./calls.model";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Call.name, schema: SchemaFactory.createForClass(Call) }]),
  ],
  controllers: [CallsController],
  providers: [CallsService],
  exports: [CallsService],
})
export class CallsModule {}

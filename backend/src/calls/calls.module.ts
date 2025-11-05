import { Module } from '@nestjs/common';
import { CallsController } from "./calls.controller";
import { CallsService } from "./calls.service";
import { Call } from "./calls.model";
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose";
import { CallCoreModule } from "../core/call-core.module";
import { CallAssignmentService } from "../core/call-core.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Call.name, schema: SchemaFactory.createForClass(Call) }]),
    CallCoreModule,
  ],
  controllers: [CallsController],
  providers: [CallsService],
  exports: [CallsService]
})
export class CallsModule {}

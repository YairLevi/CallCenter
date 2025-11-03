import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put
} from "@nestjs/common";
import { CallsService } from "./calls.service";
import { CreateCallDTO, UpdateCallDTO } from "./calls.dto";
import { Types } from "mongoose";

@Controller("calls")
export class CallsController {
  constructor(
    private readonly callService: CallsService
  ) {}

  @Get()
  getAll() {
    return this.callService.getAll()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCallDTO) {
    return this.callService.create(dto)
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCallDTO) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID value: ${id}`);
    }
    return this.callService.update(id, dto)
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID value: ${id}`);
    }
    await this.callService.delete(id)
  }
}

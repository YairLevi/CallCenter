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
import { TasksService } from "./tasks.service";
import { CreateTaskDTO, UpdateTaskDTO } from "./tasks.dto";
import { Types } from "mongoose";

@Controller("tasks")
export class TasksController {
  constructor(
    private readonly tagsService: TasksService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTaskDTO) {
    return this.tagsService.create(dto)
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTaskDTO) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID value: ${id}`);
    }
    return this.tagsService.update(id, dto)
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id") id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID value: ${id}`);
    }
    await this.tagsService.delete(id)
  }
}

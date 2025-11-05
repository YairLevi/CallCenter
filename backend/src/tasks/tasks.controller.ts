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
import { CallsService } from "../calls/calls.service";
import { CallAssignmentService } from "../core/call-core.service";

@Controller("tasks")
export class TasksController {
  constructor(
    private readonly taskService: TasksService,
    private readonly callAssignmentService: CallAssignmentService
  ) {}

  // @Post()
  // @HttpCode(HttpStatus.CREATED)
  // async create(@Body() dto: CreateTaskDTO) {
  //   const task = await this.taskService.create({ name: dto.name })
  //   await this.callAssignmentService.pushTask(dto.callID, task.id)
  // }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateTaskDTO) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID value: ${id}`);
    }
    const task = await this.taskService.update(id, dto)
    await this.callAssignmentService.touchUpdatedAt(task.call.toString())
    return task
  }

  // @Delete(":id")
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async delete(@Param("id") id: string) {
  //   if (!Types.ObjectId.isValid(id)) {
  //     throw new BadRequestException(`Invalid ID value: ${id}`);
  //   }
  //   await this.taskService.delete(id)
  // }
}

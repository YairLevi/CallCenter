import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CallsService } from "./calls.service";
import { CreateCallDTO } from "./calls.dto";
import { TaskDocument } from "../tasks/tasks.model";

@Controller("calls")
export class CallsController {
  constructor(
    private readonly callService: CallsService
  ) {}

  @Get()
  getAll() {
    return this.callService.getAll()
  }

  @Get(':id')
  getSingle(@Param('id') id: string) {
    return this.callService.getSingle(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCallDTO) {
    return this.callService.create(dto)
  }

  @Put(":id/tags")
  assignTag(@Param('id') id: string, @Body() dto: { tagID: string }) {
    return this.callService.assignTag(id, dto.tagID)
  }

  @Post(':id/tasks')
  addTask(@Param('id') id: string, @Body() dto: { name: string }) {
    return this.callService.addTask(id, dto.name)
  }

  @Put(':id/tasks')
  changeTaskStatus(@Param('id') id: string, @Body() dto: Partial<TaskDocument>) {
    return this.callService.changeTaskStatus(id, dto)
  }
}

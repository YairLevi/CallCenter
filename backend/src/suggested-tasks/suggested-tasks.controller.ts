import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SuggestedTasksService } from "./suggested-tasks.service";
import { AssignTagDTO, CreateSuggestedTaskDTO } from "./suggested-tasks.dto";
import { TasksService } from "../tasks/tasks.service";
import { CallsService } from "../calls/calls.service";

@Controller('suggested-tasks')
export class SuggestedTasksController {
  constructor(
    private readonly suggestedTasksService: SuggestedTasksService,
    private readonly taskService: TasksService,
    private readonly callService: CallsService
  ) {}

  @Get()
  async getAll() {
    return await this.suggestedTasksService.getAll()
  }

  @Post()
  async create(@Body() dto: CreateSuggestedTaskDTO) {
    const task = await this.taskService.create(dto)
    return await this.suggestedTasksService.add(task.id)
  }

  @Patch(':id/tags')
  async assignTag(@Param('id') id: string, @Body() dto: AssignTagDTO) {
    return await this.suggestedTasksService.addTag(id, dto)
  }

  @Delete(':id/tags/:tagID')
  async removeTag(@Param('id') id: string, @Param('tagID') tagID: string) {
    return await this.suggestedTasksService.removeTag(id, tagID)
  }

  @Patch(':id/tasks')
  async rename(@Param('id') id: string, @Body() dto: { name: string }) {
    const suggestion = await this.suggestedTasksService.getByID(id)
    await this.taskService.update(suggestion.task.toString(), dto)
  }

  @Patch(':id/calls')
  async assignToCall(@Param('id') suggestedTaskID: string, @Body() dto: { assignToCallID: string }) {
    const suggestion = await this.suggestedTasksService.getByID(suggestedTaskID)
    const task = await this.taskService.getByID(suggestion.task.toString())
    await this.callService.addTask(dto.assignToCallID, task.id)
    await this.taskService.update(task.id, { call: dto.assignToCallID as any, status: 'Open' })
    await this.suggestedTasksService.assignToCall(suggestedTaskID, dto.assignToCallID)
  }
}

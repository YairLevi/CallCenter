import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { SuggestedTasksService } from "./suggested-tasks.service";
import { SuggestedTask } from "./suggested-tasks.model";
import { CallsService } from "../calls/calls.service";
import { AssignTagDTO, CreateSuggestedTaskDTO } from "./suggested-tasks.dto";

@Controller('suggested-tasks')
export class SuggestedTasksController {
  constructor(
    private readonly suggestedTasksService: SuggestedTasksService,
    private readonly callService: CallsService
  ) {}

  @Get()
  async getAll() {
    return await this.suggestedTasksService.getAll()
  }

  @Post()
  async create(@Body() dto: CreateSuggestedTaskDTO) {
    console.log(dto)
    return await this.suggestedTasksService.add(dto)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<SuggestedTask>) {
    return await this.suggestedTasksService.update(id, dto)
  }

  @Patch(':id/tags')
  async assignTag(@Param('id') id: string, @Body() dto: AssignTagDTO) {
    return await this.suggestedTasksService.addTag(id, dto)
  }

  @Post(':id/:callID')
  @HttpCode(HttpStatus.OK)
  async assignToCall(@Param('id') suggestedTaskID: string, @Param('callID') callID: string) {
    const suggestedTask: SuggestedTask = await this.suggestedTasksService.getByID(suggestedTaskID)
    await this.suggestedTasksService.delete(suggestedTaskID)
    await this.callService.addTask(callID, suggestedTask.name)
  }
}

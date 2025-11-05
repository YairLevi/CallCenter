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
import { CreateCallDTO } from "./calls.dto";
import { CallAssignmentService } from "../core/call-core.service";

@Controller("calls")
export class CallsController {
  constructor(
    private readonly callService: CallsService,
    private readonly callAssignmentService: CallAssignmentService,
    // private readonly assignmentService: AssignmentsService
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

  @Delete(':id')
  async deleteCall(@Param('id') id: string) {
    await this.callService.deleteCall(id)
  }

  @Delete(':id/tags/:tagID')
  deleteTag(@Param('id') id: string, @Param('tagID') tagID: string) {
    try {
      return this.callService.deleteTag(id, tagID)
    }
    catch (e) {
      throw new BadRequestException('Failed to delete tag.')
    }
  }

  @Post(':id/tasks')
  async addTask(@Param('id') id: string, @Body() dto: { name: string }) {
    return await this.callAssignmentService.pushTask(id, dto.name)
  }
  //
  // @Post(':id/suggested-tasks')
  // @HttpCode(HttpStatus.OK)
  // async assignToCall(@Param('id') id: string, @Body() dto: { taskID: string }) {
  //   await this.assignmentService.assign(dto.taskID, id)
  // }
}

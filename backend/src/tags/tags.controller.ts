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
import { TagsService } from "./tags.service";
import { CreateTagDTO, UpdateTagDTO } from "./tags.dto";
import { Types } from "mongoose";
import { CallsService } from "../calls/calls.service";
import { SuggestedTasksService } from "../suggested-tasks/suggested-tasks.service";

@Controller("tags")
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly callService: CallsService,
    private readonly suggestedTasksService: SuggestedTasksService
  ) {}

  @Get()
  getAll() {
    return this.tagsService.getAll()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTagDTO) {
    return this.tagsService.create(dto)
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTagDTO) {
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
    const suggestions = await this.suggestedTasksService.getAll()
    for (const suggestion of suggestions) {
      await this.suggestedTasksService.removeTag(suggestion.id, id)
    }
    const calls = await this.callService.getAll()
    for (const call of calls) {
      await this.callService.removeTag(call.id, id)
    }
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "./tasks.model";
import { CreateTaskDTO, UpdateTaskDTO } from "./tasks.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>
  ) {}

  async create(dto: { name: string }) {
    return await this.taskModel.create(dto)
  }

  async getByID(taskID: string) {
    return await this.taskModel.findOne({ _id: taskID }).exec()
  }

  async update(id: string, dto: UpdateTaskDTO) {
    return await this.taskModel.findOneAndUpdate(
      { _id: id },
        dto,
      { new: true }
    ).exec()
  }

  async delete(id: string) {
    const result = await this.taskModel.deleteOne({ _id: id }).exec()
    return result.acknowledged && result.deletedCount > 0
  }
}

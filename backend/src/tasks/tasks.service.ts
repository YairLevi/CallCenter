import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from "./tasks.model";
import { CreateTaskDTO, UpdateTaskDTO } from "./tasks.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>
  ) {}

  async getAll(){
    return await this.taskModel.find().exec()
  }

  async create(dto: CreateTaskDTO) {
    await this
    return await this.taskModel.create(dto)
  }

  async update(id: string, dto: UpdateTaskDTO) {
    return await this.taskModel.findOneAndUpdate({
      _id: id
    }, {
      ...dto,
      updatedAt: new Date(),
    }, {
      new: true
    }).exec()
  }

  async delete(id: string) {
    return await this.taskModel.deleteOne({ _id: id }).exec()
  }
}

import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Call, CallDocument } from "./calls.model";
import { CreateCallDTO, UpdateCallDTO } from "./calls.dto";
import { Task } from "../tasks/tasks.model";

@Injectable()
export class CallsService {
  constructor(
    @InjectModel(Call.name) private callModel: Model<CallDocument>
  ) {}

  async getAll(){
    return await this.callModel
      .find()
      .exec()
  }

  async getSingle(id: string) {
    const populateKeys: (keyof Call)[] = ['tags', 'tasks'];
    return await this.callModel
      .findOne({ _id: id })
      .populate(populateKeys)
      .exec()
  }

  async create(dto: CreateCallDTO) {
    return await this.callModel.create(dto)
  }

  async assignTag(id: string, tagID: string) {
    await this.callModel.findOneAndUpdate(
      { _id: id, },
      { $push: { tags: tagID } },
      { new: true }
    ).exec()
  }

  async addTask(id: string, taskName: string) {
    const task = new Task()
    task.name = taskName
    await this.callModel.findOneAndUpdate(
      { _id: id, },
      { $push: { tasks: task } },
      { new: true }
    ).exec()
  }

  async delete(id: string) {
    return await this.callModel.deleteOne({ _id: id }).exec()
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Call, CallDocument } from "./calls.model";
import { CreateCallDTO } from "./calls.dto";
import { Task, TaskDocument } from "../tasks/tasks.model";

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
    const task = new Task();
    task.name = taskName;

    return await this.callModel.findOneAndUpdate(
      { _id: id },
      { $push: { tasks: task } },
      { new: true } // return the updated document
    ).exec();

  }

  async changeTaskStatus(id: string, task: Partial<TaskDocument> ) {
    const call = await this.callModel.findById(id);
    if (!call) throw new NotFoundException(`Call ${id} not found`);

    const taskDoc = call.tasks.find((t: TaskDocument) => t.id === task.id);
    if (!taskDoc) {
      throw new NotFoundException(`Task ${task.id} not found`);
    }

    if (task.status) {
      taskDoc.status = task.status;
    }

    await call.save();
    return call;
  }
}

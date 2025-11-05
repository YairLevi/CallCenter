import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Call, CallDocument } from "../calls/calls.model";
import { TaskDocument, Task } from "../tasks/tasks.model";

@Injectable()
export class CallAssignmentService {
  constructor(
    @InjectModel(Call.name) private callModel: Model<CallDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async pushTask(callId: string, taskName: string) {
    const task = await this.taskModel.create({ name: taskName, call: callId })
    return await this.callModel.findOneAndUpdate(
      { _id: callId },
      { $push: { tasks: task.id } },
      { new: true }
    ).exec()
  }

  async touchUpdatedAt(callId: string) {
    await this.callModel.updateOne(
      { _id: callId },
      { $set: { updatedAt: new Date() } },
    );
  }

  async removeTaskFromCall(taskID: string) {
    await this.callModel.findOneAndUpdate(
      { _id: taskID },
      { $pull: { tasks: taskID } }
    )
    await this.taskModel.deleteOne({ _id: taskID });
  }
}

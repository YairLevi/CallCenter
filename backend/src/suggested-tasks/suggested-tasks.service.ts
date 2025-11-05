import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Error, Model } from "mongoose";
import { SuggestedTask, SuggestedTaskDocument } from "./suggested-tasks.model";
import { AssignTagDTO } from "./suggested-tasks.dto";

@Injectable()
export class SuggestedTasksService {
  constructor(
    @InjectModel(SuggestedTask.name) private model: Model<SuggestedTaskDocument>
  ) {}

  async getAll() {
    const populateKey: (keyof SuggestedTask)[] = ['tags', 'task', 'assignedTo']
    return await this.model.find().populate(populateKey).exec()
  }

  async getByID(id: string): Promise<SuggestedTask> {
    return await this.model.findOne({ _id: id }).exec()
  }

  async add(taskID: string) {
    return await this.model.create({
      task: taskID
    })
  }

  async addTag(id: string, dto: AssignTagDTO) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      { $push: { tags: [dto.tagID] }},
      { new: true }
    ).exec()
  }

  async removeTag(id: string, tagID: string) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      { $pull: { tags: tagID }},
      { new: true}
    ).exec()
  }

  async assignToCall(suggestedTaskID: string, callID: string) {
    await this.model.findOneAndUpdate(
      { _id: suggestedTaskID },
      { $set: { assignedTo: callID } }
    )
  }

  async delete(id: string) {
    const result = await this.model.deleteOne({ _id: id }).exec()
    if (!result.acknowledged || result.deletedCount == 0)
      throw new BadRequestException("Failed to delete the suggestion. Try to refresh the page.")
  }
}

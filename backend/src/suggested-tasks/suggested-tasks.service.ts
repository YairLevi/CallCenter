import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SuggestedTask, SuggestedTaskDocument } from "./suggested-tasks.model";
import { AssignTagDTO, CreateSuggestedTaskDTO } from "./suggested-tasks.dto";

@Injectable()
export class SuggestedTasksService {
  constructor(
    @InjectModel(SuggestedTask.name) private model: Model<SuggestedTaskDocument>
  ) {}

  async getAll() {
    const populateKey: keyof SuggestedTask = 'tags'
    return await this.model.find().populate(populateKey).exec()
  }

  async getByID(id: string) {
    return await this.model.findOne({ _id: id }).exec()
  }

  async add(dto: CreateSuggestedTaskDTO) {
    return await this.model.create({ name: dto.name })
  }

  async update(id: string, dto: Partial<SuggestedTask>) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      dto,
      { new: true }
    ).exec()
  }

  async addTag(id: string, dto: AssignTagDTO) {
    return await this.model.findOneAndUpdate(
      { _id: id },
      { $push: { tags: [dto.tagID] }},
      { new: true }
    ).exec()
  }

  async delete(id: string) {
    return await this.model.deleteOne({ _id: id }).exec()
  }
}

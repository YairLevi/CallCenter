import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Tag, TagDocument } from "./tags.model";
import { CreateTagDTO, UpdateTagDTO } from "./tags.dto";

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>
  ) {}

  async create(@Body() dto: CreateTagDTO) {
    return await this.tagModel.create(dto)
  }

  async getAll() {
    return await this.tagModel.find().exec()
  }

  async update(id: string, dto: UpdateTagDTO) {
    return await this.tagModel.findOneAndUpdate({ _id: id }, dto, { new: true }).exec()
  }

  async delete(id: string) {
    return await this.tagModel.deleteOne({ _id: id }).exec()
  }
}

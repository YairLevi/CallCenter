import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Call, CallDocument } from "./calls.model";
import { CreateCallDTO, UpdateCallDTO } from "./calls.dto";

@Injectable()
export class CallsService {
  constructor(
    @InjectModel(Call.name) private callModel: Model<CallDocument>
  ) {}

  async getAll(){
    const populateField: keyof Call = 'tags'
    return await this.callModel
      .find()
      .populate(populateField)
      .exec()
  }

  async create(dto: CreateCallDTO) {
    return await this.callModel.create(dto)
  }

  async update(id: string, dto: UpdateCallDTO) {
    return await this.callModel.findOneAndUpdate({
      _id: id
    }, {
      updatedAt: new Date(),
      ...dto
    }).exec()
  }

  async delete(id: string) {
    return await this.callModel.deleteOne({ _id: id }).exec()
  }
}

import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Call, CallDocument } from "./call.model";
import { CreateCallDTO, UpdateCallDTO } from "./call.dto";

@Injectable()
export class CallService {
  constructor(
    @InjectModel(Call.name) private callModel: Model<CallDocument>
  ) {}

  async getAll(){
    return await this.callModel.find().exec()
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

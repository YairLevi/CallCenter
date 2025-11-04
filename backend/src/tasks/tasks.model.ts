import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type Status = 'Open' | 'In Progress' | 'Completed'

// we don't add validations on the properties for now.
@Schema({
  virtuals: { id: function () { return this._id.toHexString() } },
  toJSON: { virtuals: true },
  timestamps: true
})
export class Task {
  @Prop({ require: true })
  name: string

  @Prop({ require: true, default: 'Open' })
  status: Status
}

export type TaskDocument = HydratedDocument<Task>

import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Call } from "../calls/calls.model";
import { Tag } from "../tags/tags.model";

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

  @Prop({ type: Types.ObjectId, ref: 'Call', required: false }) // null = not assigned})
  call: Types.ObjectId
}

export type TaskDocument = HydratedDocument<Task>

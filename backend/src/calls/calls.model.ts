import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Tag } from "../tags/tags.model";
import { Task } from "../tasks/tasks.model";


// we don't add validations on the properties for now.
@Schema({
  virtuals: { id: function () { return this._id.toHexString() } },
  toJSON: { virtuals: true },
  timestamps: true
})
export class Call {
  @Prop({ require: true })
  name: string

  @Prop({ type: [{ type: Types.ObjectId, ref: Tag.name }], default: [] })
  tags: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: Task.name }], default: [] })
  tasks: Types.ObjectId[];
}

export type CallDocument  = HydratedDocument<Call>

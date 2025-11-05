import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Tag } from "../tags/tags.model";
import { Call } from "../calls/calls.model";
import { Task } from "../tasks/tasks.model";

// we don't add validations on the properties for now.
@Schema({
  virtuals: { id: function () { return this._id.toHexString() } },
  toJSON: { virtuals: true },
  timestamps: true,
  collection: "suggested_tasks"
})
export class SuggestedTask {
  @Prop({ type: Types.ObjectId, ref: Task.name, require: true })
  task: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: Call.name, required: false }) // null = not assigned})
  assignedTo?: Types.ObjectId

  @Prop({ type: [{ type: Types.ObjectId, ref: Tag.name }], default: [] })
  tags: Types.ObjectId[]
}

export type SuggestedTaskDocument = HydratedDocument<SuggestedTask>

import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Tag } from "../tags/tags.model";

// we don't add validations on the properties for now.
@Schema({
  virtuals: { id: function () { return this._id.toHexString() } },
  toJSON: { virtuals: true },
  timestamps: true,
  collection: "suggested_tasks"
})
export class SuggestedTask {
  @Prop({ require: true })
  name: string

  @Prop({ type: [{ type: Types.ObjectId, ref: Tag.name }], default: [] })
  tags: Types.ObjectId[]
}

export type SuggestedTaskDocument = HydratedDocument<SuggestedTask>

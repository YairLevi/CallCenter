import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


// we don't add validations on the properties for now.
@Schema({
  virtuals: { id: function () { return this._id.toHexString() } },
  toJSON: { virtuals: true }
})
export class Tag {
  @Prop({ default: new Date() })
  createdAt: Date

  @Prop({ default: new Date() })
  updatedAt: Date

  @Prop({ require: true })
  name: string
}

export type TagDocument = HydratedDocument<Tag>

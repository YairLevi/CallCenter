import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, mongo, Schema as MongooseSchema, Types } from "mongoose";
import { Tag } from "../tags/tags.model";


// we don't add validations on the properties for now.
@Schema({
  virtuals: { id: function () { return this._id.toHexString() } },
  toJSON: { virtuals: true }
})
export class Call {
  @Prop({ default: new Date() })
  createdAt: Date

  @Prop({ default: new Date() })
  updatedAt: Date

  @Prop({ require: true })
  name: string

  @Prop({ type: [{ type: Types.ObjectId, ref: Tag.name }] })
  tags: Types.ObjectId[];
}

export type CallDocument  = HydratedDocument<Call>

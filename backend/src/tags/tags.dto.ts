import { OmitType } from "@nestjs/mapped-types";
import { Tag } from "./tags.model";

export class CreateTagDTO extends OmitType(Tag, ["createdAt", "updatedAt"]) {}
export class UpdateTagDTO extends OmitType(Tag, ["createdAt", "updatedAt"]) {}

import { OmitType, PartialType } from "@nestjs/mapped-types";
import { Call } from "./call.model";

export class CreateCallDTO extends OmitType(Call, ["createdAt", "updatedAt"]) {}
export class UpdateCallDTO extends PartialType(OmitType(Call, ["createdAt", "updatedAt"])) {}

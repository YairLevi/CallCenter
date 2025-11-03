import { OmitType } from "@nestjs/mapped-types";
import { Call } from "./calls.model";

export class CreateCallDTO extends OmitType(Call, ["createdAt", "updatedAt"]) {}
export class UpdateCallDTO extends OmitType(Call, ["createdAt", "updatedAt"]) {}

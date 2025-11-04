import { OmitType } from "@nestjs/mapped-types";
import { Call } from "./calls.model";

export class CreateCallDTO extends Call {}
export class UpdateCallDTO extends Call {}

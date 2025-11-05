import { IntersectionType, OmitType, PartialType } from "@nestjs/mapped-types";
import { Task } from "./tasks.model";


export class CreateTaskDTO {
  name: string
  callID: string
}

export class UpdateTaskDTO extends PartialType(Task) {}

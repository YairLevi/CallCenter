import { IntersectionType, OmitType } from "@nestjs/mapped-types";
import { Task } from "./tasks.model";


export class CreateTaskDTO extends IntersectionType(
  OmitType(Task, ['createdAt', 'updatedAt'] as const),
  class { callID: string }
) {}

export class UpdateTaskDTO extends OmitType(Task, ['createdAt', 'updatedAt'] as const) {}

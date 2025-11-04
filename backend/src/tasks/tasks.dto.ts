import { IntersectionType, OmitType } from "@nestjs/mapped-types";
import { Task } from "./tasks.model";


export class CreateTaskDTO extends IntersectionType(
  Task,
  class { callID: string }
) {}

export class UpdateTaskDTO extends Task {}

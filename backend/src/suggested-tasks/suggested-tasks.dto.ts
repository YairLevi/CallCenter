import { SuggestedTask } from "./suggested-tasks.model";

export type CreateSuggestedTaskDTO = Pick<SuggestedTask, 'name'>
export type AssignTagDTO = { tagID: string }

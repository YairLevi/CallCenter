export enum Status {
  Open = 'Open',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export type Model = {
  updatedAt: Date,
  createdAt: Date
}

export type Tag = Model & {
  id: string
  name: string
}

export type Task =  Model & {
  id: string,
  name: string,
  status: Status,

}

export type Call =  Model & {
  id: string,
  name: string,
  tags: Tag[]
  tasks: Task[]
}

export type SuggestedTask =  Model & {
  id: string,
  task: Task,
  assignedTo?: Call,
  tags: Tag[]
}

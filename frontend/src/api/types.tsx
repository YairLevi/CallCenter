export enum Status {
  Open = 'Open',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export type Tag = {
  id: string
  name: string
}

export type Task = {
  id: string,
  name: string,
  status: Status
}

export type CallType = {
  id: string,
  name: string,
  tags: Tag[]
  tasks: Task[]
}

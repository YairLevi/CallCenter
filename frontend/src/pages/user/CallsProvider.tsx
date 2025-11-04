import { createContext, type PropsWithChildren, useContext, useState } from "react";
import { type CallType, type Tag, type Task, Status } from "@/api/types";
import { dummyCalls } from "@/pages/user/mock.ts";


type ContextExports = {
  calls: CallType[]
  add: (call: Partial<CallType>) => void
  addTask: (callID: string, task: Partial<Task>) => void
  assignTag: (callID: string, tag: Tag) => void
  editTask: (callID: string, task: Task) => void
}

const Context = createContext<ContextExports>({} as ContextExports)

export function useCalls() {
  const value = useContext(Context);

  if (value === undefined) {
    throw new Error(`must be used within its calls provider`);
  }

  return value;
}

export function CallsProvider({ children }: PropsWithChildren) {
  const [calls, setCalls] = useState<CallType[]>(dummyCalls)

  function add(call: Pick<CallType, 'name'>) {
    console.log(call)
    setCalls(prev => [...prev, {
      id: `${Math.random()}`,
      name: call.name,
      tags: [],
      tasks: [],
    }])
  }

  function assignTag(callID: string, tag: Tag) {
    const call = calls.find(c => c.id == callID)
    if (call == undefined)
      return
    if (call.tags.some(t => t.id == tag.id))
      return
    setCalls(prev => prev.map(call => {
      if (call.id !== callID) {
        return call
      }

      return {
        ...call,
        tags: [...call.tags, { ...tag }]
      }
    }))
  }

  function editTask(callID: string, task: Task) {
    const call = calls.find(c => c.id == callID)
    if (call == undefined)
      return
    if (!call.tasks.some(t => t.id == task.id))
      return
    setCalls(prev => prev.map(call => {
      if (call.id !== callID) {
        return call
      }
      return {
        ...call,
        tasks: [...call.tasks.filter(t => t.id != task.id), { ...task }]
      }
    }))
  }

  function addTask(callID: string, task: Partial<Task>) {
    const call = calls.find(c => c.id == callID)
    if (call == undefined) return
    
    const newTask: Task = {
      id: `${Math.random()}`,
      name: task.name || 'New Task',
      status: task.status || Status.Open,
    }
    
    setCalls(prev => prev.map(call => {
      if (call.id !== callID) {
        return call
      }
      return {
        ...call,
        tasks: [...call.tasks, newTask]
      }
    }))
  }

  const value = {
    calls,
    add,
    addTask,
    assignTag,
    editTask
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

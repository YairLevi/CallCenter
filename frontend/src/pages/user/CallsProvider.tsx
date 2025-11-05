import { createContext, type PropsWithChildren, useContext } from "react";
import { type Call } from "@/api/types";
import { useCallsQueries } from "@/api/calls.tsx";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useTasksQueries } from "@/api/tasks.tsx";


type ContextExports = {
  calls: Call[]
  single: (callID: string) => UseQueryResult<Call>
  add: (call: Partial<Call>) => void
  addTask: (callID: string) => UseMutationResult
  assignTag: (callID: string) => UseMutationResult
  changeTaskStatus: (taskID: string, callID: string) => UseMutationResult
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
  const callQueries = useCallsQueries()
  const taskQueries = useTasksQueries()

  const value: ContextExports = {
    calls: callQueries.getAll.data,
    single: (callID: string) => callQueries.getSingle(callID),
    add: (call: Partial<Call>) => callQueries.add.mutate(call.name),
    assignTag: callQueries.assignTag,
    addTask: taskQueries.addTask,
    changeTaskStatus: taskQueries.changeTaskStatus
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

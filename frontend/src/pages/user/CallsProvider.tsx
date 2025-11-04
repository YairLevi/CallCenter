import { createContext, type PropsWithChildren, useContext, useState } from "react";
import { type Call, type Tag, type Task, Status } from "@/api/types";
import { dummyCalls } from "@/pages/user/mock.ts";
import { useCallsQueries } from "@/api/calls.tsx";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useTasksQueries } from "@/api/tasks.tsx";


type ContextExports = {
  calls: Call[]
  single: (callID: string) => UseQueryResult<Call>
  add: (call: Partial<Call>) => void
  addTask: (callID: string) => UseMutationResult
  assignTag: (callID: string) => UseMutationResult
  // editTask: (callID: string, task: Task) => void
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
    addTask: taskQueries.addTask,
    assignTag: callQueries.assignTag
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

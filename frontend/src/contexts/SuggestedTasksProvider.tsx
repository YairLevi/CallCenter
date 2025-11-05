import { createContext, type PropsWithChildren, useContext } from "react";
import type { SuggestedTask } from "@/api/types";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useSuggestedTasksQuery } from "@/api/suggested-tasks.tsx";
import { useTasksQueries } from "@/api/tasks.tsx";


type ContextExports = {
  suggestedTasks: UseQueryResult<SuggestedTask[]>
  add: UseMutationResult,
  assign: (suggestedTaskID: string) => UseMutationResult,
  update: (SuggestedTaskID: string) => UseMutationResult,
  assignTaskToCall: (callID: string) => UseMutationResult
}

const Context = createContext<ContextExports>({} as ContextExports)

export function useSuggestedTasks() {
  const value = useContext(Context);

  if (value === undefined) {
    throw new Error(`must be used within its suggested tasks provider`);
  }

  return value;
}

export function SuggestedTasksProvider({ children }: PropsWithChildren) {
  const queries = useSuggestedTasksQuery()

  const value: ContextExports = {
    suggestedTasks: queries.getAll,
    add: queries.add,
    assign: queries.assign,
    update: queries.update,
    assignTaskToCall: queries.assignTaskToCall,
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

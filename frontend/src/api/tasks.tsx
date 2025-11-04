import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/api/calls.tsx";
import type { Task } from "@/api/types.tsx";

export function useTasksQueries() {
  const queryClient = useQueryClient()

  const addTask = (callID: string) => useMutation({
    mutationFn: (name: string) => axios.post(`/calls/${callID}/tasks`, { name }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.single(callID) })
  })

  const changeTaskStatus = (callID: string) => useMutation({
    mutationFn: (task: Partial<Task>) => axios.put(`/calls/${callID}/tasks`, task),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.single(callID) })
  })

  return {
    changeTaskStatus,
    addTask
  }
}

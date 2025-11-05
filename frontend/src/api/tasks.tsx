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

  const changeTaskStatus = (taskID: string, callID: string) => useMutation({
    mutationFn: (dto: Pick<Task, 'status'>) => axios.put(`/tasks/${taskID}`, { callID, status: dto.status }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.single(callID) })
  })

  const deleteTask = (callID: string) => useMutation({
    mutationFn: (dto: { taskID: string }) => axios.delete(`/tasks/${dto.taskID}`),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.single(callID) })
  })

  return {
    addTask,
    deleteTask,
    changeTaskStatus,
  }
}

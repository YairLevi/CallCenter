import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys } from "@/api/calls.tsx";

export function useTasksQueries() {
  const queryClient = useQueryClient()

  const addTask = (callID: string) => useMutation({
    mutationFn: (name: string) => axios.post(`/calls/${callID}/tasks`, { name }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.single(callID) })
  })

  return {
    addTask
  }
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryKeys as callsQueryKeys } from './calls'

export const queryKeys = {
  getAll: () => ['suggested-tasks']
}

export function useSuggestedTasksQuery() {
  const queryClient = useQueryClient()

  const getAll = useQuery({
    queryFn: () => axios.get('/suggested-tasks').then(res => res.data),
    queryKey: queryKeys.getAll(),
    initialData: []
  })

  const add = useMutation({
    mutationFn: (dto: { name: string }) => axios.post(`/suggested-tasks`, dto),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.getAll() })
  })

  const assign= (suggestedTaskID: string) => useMutation({
    mutationFn: (dto: { tagID: string }) => axios.patch(`/suggested-tasks/${suggestedTaskID}/tags`, dto),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.getAll() }) // not very optimized, but enough for now.
  })

  const update = (suggestedTaskID: string) => useMutation({
    mutationFn: (dto: { name: string }) => axios.patch(`/suggested-tasks/${suggestedTaskID}/tasks`, dto),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.getAll() })
  })

  const assignTaskToCall = (callID: string) => useMutation({
    mutationFn: (dto: { suggestionID: string }) => axios.patch(`/suggested-tasks/${dto.suggestionID}/calls`, { assignToCallID: callID }),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: callsQueryKeys.single(callID)})
      await queryClient.invalidateQueries({ queryKey: queryKeys.getAll()})
    },
  })

  return {
    getAll,
    add,
    assign,
    update,
    assignTaskToCall
  }
}

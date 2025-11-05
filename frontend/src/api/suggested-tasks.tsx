import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { SuggestedTask } from "@/api/types.tsx";

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
    mutationFn: (dto: Pick<SuggestedTask, 'name'>) => axios.post(`/suggested-tasks`, dto),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.getAll() })
  })

  const assign= (suggestedTaskID: string) => useMutation({
    mutationFn: (dto: { tagID: string }) => axios.patch(`/suggested-tasks/${suggestedTaskID}/tags`, dto),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.getAll() }) // not very optimized, but enough for now.
  })

  const update = (suggestedTaskID: string) => useMutation({
    mutationFn: (dto: { name: string }) => axios.put(`/suggested-tasks/${suggestedTaskID}`, dto),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.getAll() })
  })

  return {
    getAll,
    add,
    assign,
    update
  }
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Call, Tag } from "@/api/types.tsx";

export const queryKeys = {
  all: () => ['calls'],
  single: (id: string) => [...queryKeys.all(), { id }]
}

export function useCallsQueries() {
  const queryClient = useQueryClient()

  const getAll = useQuery<Call[]>({
    queryFn: () => axios.get('/calls').then(res => res.data),
    queryKey: queryKeys.all(),
    initialData: [],
  })

  const getSingle = (id: string) => useQuery<Call>({
    queryFn: () => axios.get(`/calls/${id}`).then(res => res.data),
    queryKey: queryKeys.single(id)
  })

  const add = useMutation({
    mutationFn: (name: string) => axios.post('/calls', { name }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.all() })
  })

  const deleteCall = useMutation({
    mutationFn: (dto: { callID: string }) => axios.delete(`/calls/${dto.callID}`),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.all() })
  })

  const assignTag = (callID: string) => useMutation({
    mutationFn: (tag: Tag) => axios.put(`/calls/${callID}/tags`, { tagID: tag.id }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.single(callID) })
  })

  const deleteTag = (callID: string) => useMutation({
    mutationFn: (dto: { tagID: string }) => axios.delete(`/calls/${callID}/tags/${dto.tagID}`),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.single(callID) })
  })

  const edit = useMutation({
    mutationFn: ({ tagID, newName }: {
      tagID: string,
      newName: string
    }) => axios.put(`/calls/${tagID}`, { name: newName }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.all() })
  })

  return {
    getAll,
    getSingle,
    assignTag,
    add,
    deleteCall,
    edit,
    deleteTag
  }
}

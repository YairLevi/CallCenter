import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { Tag } from "@/api/types.tsx";

const queryKeys = {
  all: () => ['tags'],
}

export function useTagsQueries() {
  const queryClient  = useQueryClient()

  const getAll = useQuery<Tag[]>({
    queryFn: () => axios.get('/tags').then(res => res.data),
    queryKey: queryKeys.all(),
    initialData: [],
  })

  const add = useMutation({
    mutationFn: (name: string) => axios.post('/tags', { name }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.all() })
  })

  const edit = useMutation({
    mutationFn: ({ tagID, newName }: { tagID: string, newName: string })=> axios.put(`/tags/${tagID}`, { name: newName }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.all() })
  })

  const deleteTag = useMutation({
    mutationFn: (dto: { tagID: string }) => axios.delete(`tags/${dto.tagID}`),
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.all() })
  })

  return {
    getAll,
    add,
    edit,
    deleteTag
  }
}

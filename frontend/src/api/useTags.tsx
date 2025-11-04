import type { Tag } from "@/api/types.tsx";
import { useState } from "react";

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([])

  function addTag(tag: Pick<Tag, 'name'>) {
    setTags(prev => [
      ...prev,
      {
        id: `${Math.random()}`,
        name: tag.name
      }
    ])
  }

  function editTag(tag: Tag) {
    setTags(prev => prev.filter(t => t.id != tag.id))
    setTags(prev => [...prev, tag])
  }

  return { tags, addTag, editTag }
}

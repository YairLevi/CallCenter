import { createContext, type PropsWithChildren, use, useContext, useEffect, useState } from "react";
import type { Tag } from "@/api/types";
import { useTagsQueries } from "@/api/tags.tsx";
import type { UseMutationResult } from "@tanstack/react-query";


type ContextExports = {
  tags: Tag[]
  add: (tag: Partial<Tag>) => void
  edit: (tag: Tag) => void
  deleteTag: UseMutationResult
}

const Context = createContext<ContextExports>({} as ContextExports)

export function useTags() {
  const value = useContext(Context);

  if (value === undefined) {
    throw new Error(`must be used within its tags provider`);
  }

  return value;
}

export function TagsProvider({ children }: PropsWithChildren) {
  const queries = useTagsQueries()

  const value = {
    tags: queries.getAll.data,
    add: (tag: Partial<Tag>) => queries.add.mutate(tag.name),
    edit: (tag: Tag) => queries.edit.mutate({ tagID: tag.id, newName: tag.name }),
    deleteTag: queries.deleteTag
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

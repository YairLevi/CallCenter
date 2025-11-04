import { createContext, type PropsWithChildren, use, useContext, useEffect, useState } from "react";
import type { Tag } from "@/api/types";
import { useTagsQueries } from "@/api/tags.tsx";


type ContextExports = {
  tags: Tag[]
  add: (tag: Partial<Tag>) => void
  edit: (tag: Tag) => void
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
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

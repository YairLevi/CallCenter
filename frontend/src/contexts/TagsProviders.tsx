import { createContext, type PropsWithChildren, useContext, useState } from "react";
import type { Tag } from "@/api/types";


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
  const [tags, setTags] = useState<Tag[]>([
    // === Extracted from dummyCalls ===
    { id: "tag-1", name: "High Priority" },
    { id: "tag-2", name: "Enterprise" },
    { id: "tag-3", name: "Q4 Goal" },
    { id: "tag-4", name: "Bug" },
    { id: "tag-5", name: "Urgent" },
    // { id: "tag-6", name: "Sales" },
    // { id: "tag-7", name: "Demo" },
    // { id: "tag-8", name: "Internal" },
    // { id: "tag-9", name: "Team" },
    // { id: "tag-10", name: "Feature Request" },
    // { id: "tag-11", name: "Product" },
    //
    // // === Extra useful tags ===
    // { id: "tag-12", name: "Blocked" },
    // { id: "tag-13", name: "Review" },
    // { id: "tag-14", name: "Customer Success" },
    // { id: "tag-15", name: "Onboarding" },
    // { id: "tag-16", name: "Escalated" },
    // { id: "tag-17", name: "Low Priority" },
    // { id: "tag-18", name: "Follow Up" },
    // { id: "tag-19", name: "Documentation" },
    // { id: "tag-20", name: "Billing" },
  ])

  function add(tag: Pick<Tag, 'name'>) {
    setTags(prev => [
      ...prev,
      {
        id: `${Math.random()}`,
        name: tag.name
      }
    ])
  }

  function edit(tag: Tag) {
    setTags(prev => prev.filter(t => t.id != tag.id))
    setTags(prev => [...prev, tag])
  }

  const value = {
    tags,
    add,
    edit
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

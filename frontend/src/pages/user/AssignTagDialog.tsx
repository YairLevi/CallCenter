import { Dialog, type DialogProps } from "@/components/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useEffect, useState } from "react";
import { useCalls } from "@/pages/user/CallsProvider.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { CallType, Tag } from "@/api/types.tsx";
import { useTags } from "@/contexts/TagsProviders.tsx";

type AssignTagDialogProps = DialogProps & {
  call: CallType
}

export function AssignTagDialog(props: AssignTagDialogProps) {
  const { assignTag } = useCalls()
  const { tags } = useTags()

  function assign(tag: Tag) {
    assignTag(props.call.id, tag)
    props.onClose()
  }

  return (
    <Dialog {...props}>
      <Dialog.Group>
        <div className="flex flex-col gap-2 overflow-y-auto h-[50vh] pr-2">
          {tags
            .sort((t1, t2) => t1.name.localeCompare(t2.name))
            .map(tag => (
              <div
                key={tag.id}
                className="min-w-fit flex items-center bg-gray-600 text-white border border-gray-500 rounded-xl px-4 py-2 text-sm cursor-pointer hover:bg-gray-500 transition-colors whitespace-nowrap"
                onClick={() => assign(tag)}
              >
                {tag.name}
              </div>
            ))}
        </div>
      </Dialog.Group>
    </Dialog>
  )
}

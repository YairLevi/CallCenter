import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Placeholder } from "@/components/placeholder.tsx";
import { Dialog, useDialogProps } from "@/components/dialog.tsx";
import { useState } from "react";
import type { Tag } from "@/api/types.tsx";
import { useTags } from "@/contexts/TagsProviders.tsx";
import { X } from "lucide-react";

export function TagsSection() {
  const [toEdit, setToEdit] = useState<Tag>()
  const [editedName, setEditedName] = useState('')
  const editDialog = useDialogProps()

  const [name, setName] = useState("")
  const { tags, add, edit, deleteTag } = useTags()

  function onAddTag() {
    if (name.length == 0)
      return
    add({ name })
    setName('')
  }

  function onOpenEditing(tag: Tag) {
    setToEdit(tag)
    setEditedName(tag.name)
    editDialog.open()
  }

  function onCloseEditing() {
    if (editedName.length == 0)
      return
    edit({ ...toEdit, name: editedName })
    editDialog.close()
  }

  return (
    <div className="flex flex-col w-full h-2/3 lg:h-full lg:w-1/3 ">
      <h2 className="font-semibold text-xl mb-2">Tags</h2>
      <p className="text-sm text-gray-500 mb-2">
        Write a name for a new tag, and add it to the list.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-6">
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 px-3 py-1 rounded"
        />
        <Button onClick={onAddTag}>Add Tag</Button>
      </div>

      <div className="flex flex-col grow overflow-y-auto">
        {tags?.length === 0
          ? <Placeholder text="No tags exist yet."/>
          : (tags ?? [])
            .sort((t1, t2) => t1.name.localeCompare(t2.name))
            .map(tag => (

              <li key={tag.id}
                  className="mb-1 group border border-gray-300 rounded-lg px-4 py-1 flex justify-between items-center">
                <div className='flex gap-2'>
                  <div
                    className={`rounded-lg hover:bg-neutral-200 p-1 opacity-0 group-hover:opacity-100 w-0 group-hover:w-6 transition-all duration-150 ease-out`}
                    onClick={() => deleteTag.mutate({ tagID: tag.id })}
                  >
                    <X size={16}/>
                  </div>
                  <p>{tag.name}</p>
                </div>
                <Button className="opacity-0 group-hover:opacity-100" onClick={() => onOpenEditing(tag)}>Edit</Button>
              </li>
            ))}
      </div>
      {
        toEdit &&
          <Dialog open={editDialog.isOpen}
                  onClose={editDialog.close}
                  title='Rename Tag'>
              <Dialog.Group>
                  <Input className="text-white"
                         value={editedName}
                         onChange={e => setEditedName(e.target.value)}/>
              </Dialog.Group>
              <Dialog.Footer>
                  <Button onClick={onCloseEditing}>Submit</Button>
              </Dialog.Footer>
          </Dialog>
      }
    </div>
  )
}

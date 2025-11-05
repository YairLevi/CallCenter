import { useState } from "react"
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Dialog, useDialogProps } from "@/components/dialog.tsx";
import type { Tag } from "@/api/types.tsx";
import { useTags } from "@/contexts/TagsProviders.tsx";
import { Placeholder } from "@/components/placeholder.tsx";

export function AdminPage() {
  const editDialog = useDialogProps()

  const [name, setName] = useState("")
  const { tags, add, edit } = useTags()

  function onAddTag() {
    if (name.length == 0)
      return
    add({ name })
    setName('')
  }

  const [toEdit, setToEdit] = useState<Tag>()
  const [editedName, setEditedName] = useState('')

  function onOpenEditing(tag: Tag) {
    setToEdit(tag)
    setEditedName(tag.name)
    editDialog.open()
  }

  function onCloseEditing() {
    edit({ ...toEdit, name: editedName })
    editDialog.close()
  }

  return (
    <>
      <div className="p-8 flex flex-col items-center gap-4 h-full w-full">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 h-fit sm:items-center">
          <p className="font-bold">Name:</p>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-1 rounded"
          />
          <Button onClick={onAddTag}>Add</Button>
        </div>

        <div className="mt-6 items-left w-full flex flex-col overflow-y-auto lg:w-1/2">
          <h2 className="font-semibold text-lg mb-2">Tags:</h2>
          <ul className="h-full overflow-y-auto">
            {
              tags?.length == 0
                ? <Placeholder text="No tags exist yet."/>
                : (tags ?? [])
                  .sort((t1, t2) => t1.name.localeCompare(t2.name))
                  .map(tag => (
                    <li key={tag.id}
                        className="mb-1 border border-gray-300 rounded-md p-4 flex justify-between items-center">
                      <p>{tag.name}</p>
                      <Button onClick={() => onOpenEditing(tag)}>Edit</Button>
                    </li>
                  ))}
          </ul>
        </div>
      </div>

      {toEdit &&
          <Dialog open={editDialog.isOpen} onClose={editDialog.close} title='Rename Tag'>
              <Dialog.Group>
                  <Input className="text-white" value={editedName} onChange={e => setEditedName(e.target.value)}/>
              </Dialog.Group>
              <Dialog.Footer>
                  <Button onClick={onCloseEditing}>Submit</Button>
              </Dialog.Footer>
          </Dialog>}
    </>
  )
}

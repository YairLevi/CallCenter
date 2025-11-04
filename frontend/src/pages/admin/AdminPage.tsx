import { useState } from "react"
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useTags } from "@/api/useTags.tsx";
import { Dialog } from "@/components/dialog.tsx";
import type { Tag } from "@/api/types.tsx";

export function AdminPage() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const { tags, addTag, editTag } = useTags()

  function onAddTag() {
    if (name.length == 0)
      return
    addTag({ name })
    setName('')
  }

  const [toEdit, setToEdit] = useState<Tag>()
  const [editedName, setEditedName] = useState('')
  function onEditTag(tag: Tag) {
    setToEdit(tag)
    setEditedName(tag.name)
    setOpen(true)
  }

  function onCloseEditing() {
    toEdit.name = editedName
    editTag(toEdit)
    setOpen(false)
  }

  return (
    <div className="p-8 flex flex-col items-center gap-4 mx-60 h-full">
      <div className="flex gap-10 h-fit items-center">
        <p className="font-bold">Name:</p>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 px-3 py-1 rounded"
        />
        <Button onClick={onAddTag}>Add</Button>
      </div>

      <div className="mt-6 items-left w-full flex flex-col overflow-y-auto">
        <h2 className="font-semibold text-lg mb-2">Tags:</h2>
        <ul className="h-full overflow-y-auto">
          {tags.map(tag => (
            <li key={tag.id} className="mb-1 border border-gray-300 rounded-md p-4 flex justify-between items-center">
              <p>{tag.name}</p>
              <Button onClick={() => onEditTag(tag)}>Edit</Button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} title='Rename Tag'>
        <Dialog.Group>
          <Input className="text-white" value={editedName} onChange={e => setEditedName(e.target.value)} />
        </Dialog.Group>
        <Dialog.Footer>
          <Button onClick={onCloseEditing}>Submit</Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  )
}

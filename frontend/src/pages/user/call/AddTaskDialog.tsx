import { Dialog, type DialogProps } from "@/components/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useCalls } from "@/pages/user/CallsProvider.tsx";
import type { Call } from "@/api/types.tsx";
import { useParams } from "react-router";

export function AddTaskDialog(props: DialogProps) {
  const { id } = useParams()
  const [name, setName] = useState('')
  const mutation = useCalls().addTask(id)

  function submit() {
    mutation.mutate(name)
    props.onClose()
  }

  return (
    <Dialog {...props}>
      <Dialog.Group>
        <label className="text-white">Name:</label>
        <Input
          className='text-white'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </Dialog.Group>
      <Dialog.Footer>
        <Button onClick={submit}>Add</Button>
      </Dialog.Footer>
    </Dialog>
  )
}

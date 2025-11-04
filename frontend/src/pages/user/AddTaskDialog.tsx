import { Dialog, type DialogProps } from "@/components/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useCalls } from "@/pages/user/CallsProvider.tsx";
import type { CallType } from "@/api/types.tsx";

type Props = DialogProps & {
  call: CallType
}

export function AddTaskDialog(props: Props) {
  const [name, setName] = useState('')
  const { addTask } = useCalls()

  function submit() {
    addTask(props.call.id, { name })
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

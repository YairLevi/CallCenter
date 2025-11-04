import { Dialog, type DialogProps } from "@/components/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";
import { useCalls } from "@/pages/user/CallsProvider.tsx";
import { Button } from "@/components/ui/button.tsx";

export function AddCallDialog(props: DialogProps) {
  const [name, setName] = useState('')
  const { add } = useCalls()

  function submit() {
    add({ name })
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

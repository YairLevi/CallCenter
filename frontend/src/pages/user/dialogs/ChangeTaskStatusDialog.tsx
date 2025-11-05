import { Dialog, type DialogProps } from "@/components/dialog.tsx";
import { useCalls } from "@/contexts/CallsProvider.tsx";
import { Status, type Task } from "@/api/types.tsx";
import { useParams } from "react-router";

type AssignTagDialogProps = DialogProps & {
  task: Task
}

export function ChangeTaskStatusDialog(props: AssignTagDialogProps) {
  const { id } = useParams()
  const mutation = useCalls().changeTaskStatus(props.task.id, id)

  function changeStatus(status: Status) {
    mutation.mutate({ ...props.task, status})
    props.onClose()
  }

  return (
    <Dialog {...props}>
      <Dialog.Group>
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[50vh] pr-2">
          {Object.values(Status).map((status) => (
            <div
              key={status}
              className="min-w-fit flex items-center bg-gray-600 text-white border border-gray-500 rounded-xl px-4 py-2 text-sm cursor-pointer hover:bg-gray-500 transition-colors whitespace-nowrap"
              onClick={() => changeStatus(status)}
            >
              {status}
            </div>
          ))}
        </div>
      </Dialog.Group>
    </Dialog>
  )
}

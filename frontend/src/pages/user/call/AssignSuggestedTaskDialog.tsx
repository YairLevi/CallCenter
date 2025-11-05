import { useParams } from "react-router";
import { Dialog, type DialogProps } from "@/components/dialog.tsx";
import { useSuggestedTasks } from "@/contexts/SuggestedTasksProvider.tsx";
import type { Tag } from "@/api/types.tsx";
import { Placeholder } from "@/components/placeholder.tsx";

type Props = DialogProps & {
  tags: Tag[]
}

export function AssignSuggestedTaskDialog(props: Props) {
  const { id } = useParams()
  const { assignTaskToCall, suggestedTasks } = useSuggestedTasks()
  const mutation = assignTaskToCall(id)

  function assign(suggestionID: string) {
    mutation.mutate({ suggestionID })
    props.onClose()
  }

  if (suggestedTasks.isPending)
    return <div>Loading suggested tasks...</div>
  if (suggestedTasks.isError)
    return <div>Error happened while trying to fetch suggested tasks.</div>

  const matchingTasks = suggestedTasks.data.filter(suggestion => suggestion.tags
    .map(t=>t.id)
    .some(tag => props.tags
      .map(t=>t.id)
      .includes(tag)
    )
    &&
    !suggestion.assignedTo
  )

  return (
    <Dialog {...props}>
      <Dialog.Group>
        <div className="flex flex-col gap-2 overflow-y-auto h-[50vh] pr-2">
          {
            matchingTasks.length == 0
              ? <Placeholder text="Could not find a suggested task with any of this call's tags."/>
              : matchingTasks
                .sort((t1, t2) => t1.task.name.localeCompare(t2.task.name))
                .map(suggestion => (
                  <div
                    key={suggestion.id}
                    className="min-w-fit flex items-center bg-gray-600 text-white border border-gray-500 rounded-xl px-4 py-2 text-sm cursor-pointer hover:bg-gray-500 transition-colors whitespace-nowrap"
                    onClick={() => assign(suggestion.id)}
                  >
                    {suggestion.task.name}
                  </div>
                ))}
        </div>
      </Dialog.Group>
    </Dialog>
  )
}

import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";
import { useSuggestedTasks } from "@/contexts/SuggestedTasksProvider.tsx";
import { useTags } from "@/contexts/TagsProviders.tsx";
import { Badge } from "@/components/badge.tsx";
import { Dialog, useDialogProps } from "@/components/dialog.tsx";
import type { SuggestedTask } from "@/api/types.tsx";
import { EditableText } from "@/components/editable-text.tsx";
import { Placeholder } from "@/components/placeholder.tsx";

type State = 'Loading' | 'Done'

export function SuggestedTasksSection() {
  const [name, setName] = useState('')
  const { add, suggestedTasks, assign, update } = useSuggestedTasks()
  const assignTagDialog = useDialogProps()
  const { tags } = useTags()

  // used to determine which task is currently edited. note: not ideal.
  const [selectedTask, setSelectedTask] = useState<SuggestedTask>()
  const { mutate } = assign(selectedTask?.id)
  const { mutate: mutateName } = update(selectedTask?.id)

  useEffect(() => console.log('a'))

  function onAddTask() {
    if (name.length == 0)
      return
    add.mutate({ name })
  }

  function onSubmit(tagID: string) {
    mutate({ tagID })
    assignTagDialog.close()
  }

  function openAssignTag(task: SuggestedTask) {
    setSelectedTask(task)
    assignTagDialog.open()
  }

  if (suggestedTasks.isPending)
    return <div>Loading...</div>
  if (suggestedTasks.isError)
    return <div>Error occurred</div>

  return (
    <div className='flex flex-col w-full h-2/3 lg:h-full lg:w-2/3'>
      <h2 className="font-semibold text-xl mb-2">Suggested Tasks</h2>
      <p className="text-sm text-gray-500 mb-2">
        Suggest custom tasks to users, based on their attached tags.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-6">
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 px-3 py-1 rounded"
        />
        <Button onClick={() => onAddTask()}>Add Suggested Task</Button>
      </div>
      <div className='overflow-auto w-full lg:h-3/4 lg:w-full  flex flex-col gap-2'>
        {
          suggestedTasks?.data.length == 0
            ? <Placeholder text='No suggested tasks exist yet.'/>
            : suggestedTasks.data.map(suggestion => { console.log(suggestion); return (
              <div
                key={suggestion.id}
                className={`px-5 py-3 rounded-lg border border-gray-300 flex flex-col justify-between items-start transition ${!!suggestion.assignedTo ? 'opacity-30 -z-100 pointer-events-none' : ''}`}
              >
                <div className="w-full flex justify-between items-start">
                  <EditableText
                    initialValue={suggestion.task.name}
                    onEdit={() => setSelectedTask(suggestion)}
                    onSave={(updatedName) => mutateName({ name: updatedName })}
                  />

                  {!!suggestion.assignedTo && (
                    <span
                      className="ml-2 flex items-center text-xs font-medium text-green-600 bg-green-100 border border-green-300 px-2 py-0.5 rounded-full">Assigned</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 my-3 items-center">
                  {suggestion.tags.map(tag => (
                    <Badge key={tag.id} tag={tag} onDelete={() => {}}/>
                  ))}
                  <Button
                    className="bg-transparent border-gray-300 border text-black hover:bg-gray-200 rounded-xl px-4 py-1 text-sm whitespace-nowrap"
                    onClick={() => openAssignTag(suggestion)}
                  >
                    + Add Tag
                  </Button>
                </div>
              </div>
            )})
        }
      </div>

      <Dialog open={assignTagDialog.isOpen} onClose={assignTagDialog.close} title='Assign a tag to the task'>
        <Dialog.Group>
          <div className="flex flex-col gap-2 overflow-y-auto h-[50vh] pr-2">
            {tags
              .sort((t1, t2) => t1.name.localeCompare(t2.name))
              .map(tag => (
                <div
                  key={tag.id}
                  className="min-w-fit flex items-center bg-gray-600 text-white border border-gray-500 rounded-xl px-4 py-2 text-sm cursor-pointer hover:bg-gray-500 transition-colors whitespace-nowrap"
                  onClick={() => onSubmit(tag.id)}
                >
                  {tag.name}
                </div>
              ))}
          </div>
        </Dialog.Group>
      </Dialog>

    </div>
  )
}

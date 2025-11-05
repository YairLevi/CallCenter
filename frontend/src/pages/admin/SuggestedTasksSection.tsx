import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { useSuggestedTasks } from "@/contexts/SuggestedTasksProvider.tsx";
import { useTags } from "@/contexts/TagsProviders.tsx";
import { Badge } from "@/components/badge.tsx";
import { Dialog, useDialogProps } from "@/components/dialog.tsx";
import type { SuggestedTask } from "@/api/types.tsx";

type State = 'Loading' | 'Done'

export function SuggestedTasksSection() {
  const [name, setName] = useState('')
  const { add, suggestedTasks, assign } = useSuggestedTasks()
  const assignTagDialog = useDialogProps()
  const { tags } = useTags()

  // used to determine which task is currently edited. note: not ideal.
  const [selectedTask, setSelectedTask] = useState<SuggestedTask>()
  const { mutate } = assign(selectedTask?.id)

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
        <Button onClick={() => { add.mutate({ name }) }}>Add Suggested Task</Button>
      </div>
      <div className='overflow-auto w-full lg:h-3/4 lg:w-full  flex flex-col gap-2'>
        {
          suggestedTasks.data.map(task => (
            <div
              key={task.id}
              className="px-5 py-3 rounded-lg border-2 justify-between border-gray-200 flex items-start flex-col"
            >
              <span className='font-semibold'>{task.name}</span>
              <div className="flex flex-wrap gap-2 my-3 items-center">
                {task.tags.map(tag => <Badge key={tag.id} tag={tag} onDelete={() => {}}/>)}
                <Button
                  className="bg-transparent border-gray-300 border text-black hover:bg-gray-200 rounded-xl px-4 py-1 text-sm whitespace-nowrap"
                  onClick={() => openAssignTag(task)}
                >
                  + Add Tag
                </Button>
              </div>
            </div>
          ))
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

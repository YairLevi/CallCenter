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
import { X } from "lucide-react";
import { useMutationErrorMessage } from "@/hooks/useMutationErrorMessage.tsx";


export function SuggestedTasksSection() {
  const { tags } = useTags()

  const [name, setName] = useState('')
  // used to determine which task is currently edited. TODO: if there's time, try to find more organized solution
  const [selectedTask, setSelectedTask] = useState<SuggestedTask>()
  const assignTagDialog = useDialogProps()

  const { add, suggestedTasks, assign, update, removeTag, delete: deleteSuggestion } = useSuggestedTasks()

  const assignTabToSuggestion = assign(selectedTask?.id)
  const updateSuggestion = update(selectedTask?.id)

  const error = useMutationErrorMessage([
    deleteSuggestion,
    removeTag,
    assignTabToSuggestion,
    updateSuggestion,
    add,
  ])

  function onAddTask() {
    if (name.length == 0)
      return
    add.mutate({ name })
  }

  function onSubmit(tagID: string) {
    assignTabToSuggestion.mutate({ tagID })
    assignTagDialog.close()
  }

  function openAssignTag(task: SuggestedTask) {
    setSelectedTask(task)
    assignTagDialog.open()
  }

  function onUpdate(name: string) {
    if (name.length == 0)
      return
    updateSuggestion.mutate({ name })
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
            : suggestedTasks.data.map(suggestion => (
              <div
                key={suggestion.id}
                className={`px-5 py-3 rounded-lg border border-gray-300 flex flex-col justify-between items-start transition ${!!suggestion.assignedTo ? 'opacity-30 -z-100 pointer-events-none' : ''}`}
              >
                <div className="w-full flex justify-between items-start">
                  <EditableText
                    initialValue={suggestion.task.name}
                    onEdit={() => setSelectedTask(suggestion)}
                    onSave={(updatedName) => onUpdate(updatedName)}
                  />

                  {!!suggestion.assignedTo
                    ?
                    <span
                      className="ml-2 flex items-center text-xs font-medium text-green-600 bg-green-100 border border-green-300 px-2 py-0.5 rounded-full">Assigned</span>
                    : <div className='rounded-lg hover:bg-neutral-200 p-1' onClick={() => deleteSuggestion.mutate({ suggestionID: suggestion.id })}><X size={16}/></div>
                  }
                </div>

                <div className="flex flex-wrap gap-2 my-3 items-center">
                  {suggestion.tags.map(tag => (
                    <Badge key={tag.id} tag={tag} onDelete={() => removeTag.mutate({ suggestionID: suggestion.id, tagID: tag.id })}/>
                  ))}
                  <Button
                    className="bg-transparent border-gray-300 border text-black hover:bg-gray-200 rounded-xl px-4 py-1 text-sm whitespace-nowrap"
                    onClick={() => openAssignTag(suggestion)}
                  >
                    + Add Tag
                  </Button>
                </div>

              </div>
            ))
        }
      </div>
      {error.length > 0 && <p className='my-5 text-red-500'>{error}</p>}
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

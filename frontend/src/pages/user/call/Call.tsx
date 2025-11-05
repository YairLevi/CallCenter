import type { Task } from "@/api/types.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { useCalls } from "@/pages/user/CallsProvider.tsx";
import { useParams } from "react-router";
import { AssignTagDialog } from "@/pages/user/call/AssignTagDialog.tsx";
import { AddTaskDialog } from "@/pages/user/call/AddTaskDialog.tsx";
import { ChangeTaskStatusDialog } from "@/pages/user/call/ChangeTaskStatusDialog.tsx";
import { Placeholder } from "@/components/placeholder.tsx";
import { Badge } from "@/components/badge.tsx";
import { AssignSuggestedTaskDialog } from "@/pages/user/call/AssignSuggestedTaskDialog.tsx";
import { useDialogProps } from "@/components/dialog.tsx";
import { isServer } from "@tanstack/react-query";
import { useTags } from "@/contexts/TagsProviders.tsx";

export function Call() {
  const [open, setOpen] = useState(false)
  const [openStatusChanger, setOpenStatusChanger] = useState(false)
  const [openAddTask, setOpenAddTask] = useState(false)
  const suggestedTasksDialogProps = useDialogProps()

  const { id } = useParams()
  const { tags } = useTags()
  const { data: call, isPending, isError } = useCalls().single(id)
  const [selectedTask, setSelectedTask] = useState<Task>()

  if (isPending)
    return <div>Loading...</div>
  if (isError)
    return <div>Error getting tasks for call</div>
  if (!call)
    return <div>Failed to select current call. Try to refresh the page</div>

  return <>
    <div className="flex flex-col h-full">
      <h1 className="font-semibold text-xl">Selected Call: {call.name}</h1>
      <p className="font-bold mt-5">Tags:</p>
      <div className="flex flex-wrap gap-2 my-3 items-center">
        {call.tags?.map(tag => <Badge key={tag.id} tag={tag} />)}
        <Button variant='outline' onClick={() => setOpen(true)}>
          + Add Tag
        </Button>
      </div>

      <div className="flex flex-col mt-10 h-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between flex-shrink-0 gap-2">
          <p className="font-bold">Tasks:</p>
          <div className="flex gap-2">
            <Button onClick={() => setOpenAddTask(true)}>Add Task</Button>
            <Button variant="outline" onClick={() => suggestedTasksDialogProps.open()}>
              Assign Suggested Task
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-10 overflow-auto h-2/3 mb-20">
          {
            !call.tasks || call.tasks.length == 0
              ? <Placeholder text='No tasks have been created for this call.'/>
              : call.tasks.sort((task1, task2) => task1.name.localeCompare(task2.name))
                .map(task => (
                  <div
                    key={task.id}
                    className="px-5 py-3 rounded-lg border-2 justify-between border-gray-200 flex items-center"
                  >
                    <span className='font-semibold'>{task.name}</span>
                    <span className="cursor-pointer text-sm" onClick={() => {
                      setSelectedTask(task);
                      setOpenStatusChanger(true)
                    }}>{task.status}</span>
                  </div>
                ))}
        </div>
      </div>
    </div>

    {selectedTask &&
        <ChangeTaskStatusDialog
            title={`Change status for task: ${selectedTask.name}`}
            open={openStatusChanger}
            task={selectedTask}
            onClose={() => setOpenStatusChanger(false)}
        />}
    <AssignSuggestedTaskDialog tags={call.tags.length == 0 ? tags : call.tags} open={suggestedTasksDialogProps.isOpen} onClose={suggestedTasksDialogProps.close} title='Assign a suggested task'/>
    <AddTaskDialog open={openAddTask} onClose={() => setOpenAddTask(false)} title='Add New Task'/>
    <AssignTagDialog open={open} onClose={() => setOpen(false)} title='Assign Tag to Call'/>
  </>
}

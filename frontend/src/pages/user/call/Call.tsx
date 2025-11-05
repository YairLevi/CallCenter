import type { Task } from "@/api/types.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { useCalls } from "@/pages/user/CallsProvider.tsx";
import { useParams } from "react-router";
import { AssignTagDialog } from "@/pages/user/call/AssignTagDialog.tsx";
import { AddTaskDialog } from "@/pages/user/call/AddTaskDialog.tsx";
import { ChangeTaskStatusDialog } from "@/pages/user/call/ChangeTaskStatusDialog.tsx";
import { Placeholder } from "@/components/placeholder.tsx";

export function Call() {
  const [open, setOpen] = useState(false)
  const [openStatusChanger, setOpenStatusChanger] = useState(false)
  const [openAddTask, setOpenAddTask] = useState(false)

  const { id } = useParams()
  const { data: call, isPending } = useCalls().single(id)
  const [selectedTask, setSelectedTask] = useState<Task>()


  if (isPending)
    return <div>Loading...</div>

  return <>
    <div className="flex flex-col h-full">
      <h1 className="font-semibold text-xl">Selected Call: {call.name}</h1>
      <p className="font-bold mt-5">Tags:</p>
      <div className="flex flex-wrap gap-2 my-3 items-center">
        {call?.tags?.map(tag => (
          <div
            key={tag.id}
            className="flex items-center bg-gray-600 text-white border border-gray-500 rounded-xl px-4 py-1 text-sm whitespace-nowrap"
          >
            {tag.name}
          </div>
        ))}
        <Button
          className="bg-transparent border-gray-300 border text-black hover:bg-gray-200 rounded-xl px-4 py-1 text-sm whitespace-nowrap"
          onClick={() => setOpen(true)}
        >
          + Add Tag
        </Button>
      </div>

      <div className="flex flex-col mt-10 h-full">
        <div className="flex justify-between flex-shrink-0">
          <p className="font-bold">Tasks:</p>
          <Button onClick={() => setOpenAddTask(true)}>Add Task</Button>
        </div>

        <div className="flex flex-col gap-2 mt-10 overflow-auto h-2/3 mb-20">
          {
            !call?.tasks || call?.tasks.length == 0
              ? <Placeholder text='No tasks have been created for this call.'/>
              : call?.tasks?.sort((task1, task2) => task1.name.localeCompare(task2.name))
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
    <AddTaskDialog open={openAddTask} onClose={() => setOpenAddTask(false)} title='Add New Task'/>
    <AssignTagDialog open={open} onClose={() => setOpen(false)} title='Assign Tag to Call'/>
  </>
}

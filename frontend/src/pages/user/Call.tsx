import type { CallType, Task } from "@/api/types.tsx";
import { Button } from "@/components/ui/button.tsx";
import { AssignTagDialog } from "@/pages/user/AssignTagDialog.tsx";
import { useState } from "react";
import { ChangeTaskStatusDialog } from "@/pages/user/ChangeTaskStatusDialog.tsx";
import { AddTaskDialog } from "@/pages/user/AddTaskDialog.tsx";

export type CallProps = {
  call: CallType
}

export function Call({ call }: CallProps) {
  const [open, setOpen] = useState(false)
  const [openStatusChanger, setOpenStatusChanger] = useState(false)
  const [openAddTask, setOpenAddTask] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task>()

  return <>
    <div className="flex flex-col h-full">
      <h1 className="font-semibold text-xl">Call: {call.name}</h1>
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
          className="bg-transparent text-black hover:bg-gray-200 rounded-xl px-4 py-1 text-sm whitespace-nowrap"
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

        <div className="flex flex-col gap-2 mt-10 overflow-auto h-2/3">
          {call?.tasks?.sort((task1, task2) => task1.name.localeCompare(task2.name))
            .map(task => (
              <div
                key={task.id}
                className="px-5 py-3 rounded-lg border-2 justify-between border-gray-200 flex items-center"
              >
                <span>{task.name}</span>
                <span onClick={() => {
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
            call={call}
            task={selectedTask}
            onClose={() => setOpenStatusChanger(false)}
        />}

    <AddTaskDialog
      open={openAddTask}
      onClose={() => setOpenAddTask(false)}
      title='Add New Task'
      call={call}
    />

    <AssignTagDialog
      open={open}
      onClose={() => setOpen(false)}
      title='Assign Tag to Call'
      call={call}
    />
  </>
}

import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";
import { type CallType } from '@/api/types'
import { useCalls } from "@/pages/user/CallsProvider.tsx";
import { AddCallDialog } from "@/pages/user/AddCallDialog.tsx";
import { Call } from "@/pages/user/Call.tsx";


export function UserPage() {
  const [open, setOpen] = useState(false)
  const [selectedCall, setSelectedCall] = useState<CallType>()
  const { calls } = useCalls()

  useEffect(() => {
    if (selectedCall == undefined)
      return
    const selectedID = selectedCall.id
    const call = calls.find(c => c.id == selectedID)
    if (call != undefined)
    {console.log('here');setSelectedCall(call)}
    else
      setSelectedCall(null)
  }, [calls])

  return (
    <>
      <div className="p-10 flex gap-20 h-full">
        <div className="flex flex-col w-1/4 min-w-[10rem]  gap-5">
          <div className="flex items-center justify-between w-full">
            <p className="font-bold text-xl">Calls</p>
            <Button onClick={() => setOpen(true)}>Add</Button>
          </div>
          <div className="flex flex-col overflow-auto gap-2">
            {
              calls?.map(call => (
                <span key={call.id} onClick={() => setSelectedCall(call)} className="px-5 py-3 rounded-lg border-2 border-gray-200">{call.name}</span>
              ))
            }
          </div>
        </div>
        <div className="border-1 border-gray-200 h-full"/>

        <div className="flex-1 h-full">
          {
            !selectedCall
              ? <div className="text-center mt-auto">Press here to create a new call...</div>
              : <Call call={selectedCall} />
          }
        </div>
      </div>

      <AddCallDialog open={open} onClose={() => setOpen(false)} title='Add New Call'/>
    </>
  )
}

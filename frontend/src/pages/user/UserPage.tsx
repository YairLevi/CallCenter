import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";
import { type Call as CallType } from '@/api/types'
import { useCalls } from "@/pages/user/CallsProvider.tsx";
import { AddCallDialog } from "@/pages/user/AddCallDialog.tsx";
import { Call } from "@/pages/user/Call.tsx";
import { Route, Routes, useNavigate } from "react-router";


export function UserPage() {
  const [open, setOpen] = useState(false)
  const [selectedCallID, setSelectedCallID] = useState('')
  const { calls } = useCalls()
  const navigate = useNavigate()

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
                <span key={call.id} onClick={() => navigate(`/user/calls/${call.id}`)} className="px-5 py-3 rounded-lg border-2 border-gray-200">{call.name}</span>
              ))
            }
          </div>
        </div>
        <div className="border-1 border-gray-200 h-full"/>

        <div className="flex-1 h-full">
          <Routes>
            <Route path='/' element={<div className="h-full text-gray-400 select-none italic flex items-center justify-center" onClick={() => setOpen(true)}>Press here to create a new call...</div>}/>
            <Route path='/calls/:id' element={<Call />}/>
          </Routes>
        </div>
      </div>

      <AddCallDialog open={open} onClose={() => setOpen(false)} title='Add New Call'/>
    </>
  )
}

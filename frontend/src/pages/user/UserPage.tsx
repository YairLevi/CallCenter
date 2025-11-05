import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { useCalls } from "@/pages/user/CallsProvider.tsx";
import { AddCallDialog } from "@/pages/user/AddCallDialog.tsx";
import { Call } from "@/pages/user/call/Call.tsx";
import { Route, Routes, useNavigate } from "react-router";
import { Input } from "@/components/ui/input.tsx";
import { Placeholder } from "@/components/placeholder.tsx";


export function UserPage() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { calls } = useCalls()
  const navigate = useNavigate()

  const loweredSearch = search.toLowerCase()
  const filteredCalls = calls?.filter(call => call.name.toLowerCase().includes(loweredSearch)) ?? []

  return (
    <>
      <div className="p-10 flex flex-col lg:flex-row gap-20 h-full">
        <div className="flex flex-col w-full lg:w-1/4 min-w-[10rem]  gap-5">
          <div className="flex items-center justify-between w-full">
            <p className="font-bold text-xl">Calls</p>
            <Button onClick={() => setOpen(true)}>Add</Button>
          </div>
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder={'Search for a call...'}/>
          <div className="flex flex-col overflow-auto gap-2 lg:h-full h-60">
            {
              filteredCalls.length == 0
                ? <Placeholder text='Found no matching calls.'/>
                : filteredCalls.map(call => (
                  <span key={call.id} onClick={() => navigate(`/user/calls/${call.id}`)}
                        className="px-5 py-3 rounded-lg border-2 border-gray-200">{call.name}</span>
                ))
            }
          </div>
        </div>
        <div className="border-1 border-gray-200 not-lg:w-full lg:h-full"/>

        <div className="flex-1 h-full">
          <Routes>
            <Route path='/'
                   element={<div className="h-full text-gray-400 select-none italic flex items-center justify-center"
                                 onClick={() => setOpen(true)}>Press here to create a new call...</div>}/>
            <Route path='/calls/:id' element={<Call/>}/>
          </Routes>
        </div>
      </div>

      <AddCallDialog open={open} onClose={() => setOpen(false)} title='Add New Call'/>
    </>
  )
}

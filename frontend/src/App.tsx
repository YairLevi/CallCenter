import { Route, Routes, useNavigate } from "react-router";
import { AdminPage } from "./pages/admin/AdminPage";
import { Button } from "@/components/ui/button.tsx";
import { UserPage } from "@/pages/user/UserPage";
import { CallsProvider } from "@/contexts/CallsProvider.tsx";
import { TagsProvider } from "@/contexts/TagsProviders.tsx";
import { SuggestedTasksProvider } from "@/contexts/SuggestedTasksProvider.tsx";
import './App.css'

function App() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex flex-col md:flex-row mb-10 px-4 md:px-20 border-b border-gray-300 items-start md:items-center gap-4 md:gap-10 pb-5 -mt-5">
        <h1 className='text-2xl md:text-3xl font-bold italic'>Oopsify!</h1>
        <div className="flex gap-4 md:gap-6">
          <Button className='text-lg md:text-xl' variant='ghost' onClick={() => navigate('/admin')}>Admin</Button>
          <Button className='text-lg md:text-xl' variant='ghost' onClick={() => navigate('/user')}>User</Button>
        </div>
      </div>
      <TagsProvider>
        <SuggestedTasksProvider>
          <div className="w-8/10 h-8/10 self-center">
            <Routes>
              <Route path='/admin' element={<AdminPage/>}/>
              <Route path='/user/*' element={
                <CallsProvider>
                  <UserPage/>
                </CallsProvider>
              }/>
              <Route path='*' element={<div className='w-full h-full flex items-center justify-center'>
                Please select if you'd like to go to the Admin or User page, using the buttons above.
              </div>}/>
            </Routes>
          </div>
        </SuggestedTasksProvider>
      </TagsProvider>
    </div>
  )
}

export default App

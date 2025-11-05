import { Route, Routes, useLocation, useNavigate } from "react-router";
import { AdminPage } from "./pages/admin";
import { Button } from "@/components/ui/button.tsx";
import { UserPage } from "@/pages/user";
import { CallsProvider } from "@/pages/user/CallsProvider.tsx";
import { TagsProvider } from "@/contexts/TagsProviders.tsx";
import './App.css'
import { SuggestedTasksProvider } from "@/contexts/SuggestedTasksProvider.tsx";

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  // could be more dynamic, but for the sake of speed.
  const isAdmin = location.pathname.startsWith('admin')
  const isUser = location.pathname.startsWith('/user')

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex items-center mb-20">
        <Button
          className={`cursor-pointer rounded-r-none border-r-2 ${isAdmin ? 'bg-sky-700' : 'bg-neutral-700'}`}
          onClick={() => navigate('/admin')}
        >
          Admin
        </Button>
        <Button
          className={`cursor-pointer rounded-l-none border-l-0 ${isUser ? 'bg-sky-700' : 'bg-neutral-700'}`}
          onClick={() => navigate('/user')}
        >
          User
        </Button>
      </div>
      <TagsProvider>
        <SuggestedTasksProvider>
          <div className="w-8/10 h-8/10">
            <Routes>
              <Route path='/admin' element={<AdminPage/>}/>
              <Route path='/user/*' element={
                <CallsProvider>
                  <UserPage/>
                </CallsProvider>
              }/>
              <Route path='*' element={<div className='w-full h-full flex items-center justify-center'>Please select if you'd like to go to the Admin or User page, using the buttons above.</div>}/>
            </Routes>
          </div>
        </SuggestedTasksProvider>
      </TagsProvider>
    </div>
  )
}

export default App

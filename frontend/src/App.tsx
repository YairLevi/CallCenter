import { Route, Routes, useLocation, useNavigate } from "react-router";
import { AdminPage } from "./pages/admin";
import { Button } from "@/components/ui/button.tsx";
import { UserPage } from "@/pages/user";
import { CallsProvider } from "@/pages/user/CallsProvider.tsx";
import { TagsProvider } from "@/contexts/TagsProviders.tsx";
import './App.css'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const isAdmin = location.pathname.endsWith('admin')
  const isUser = location.pathname.endsWith('user')

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
        <div className="w-8/10 h-8/10">
          <Routes>
            <Route path='/admin' element={<AdminPage/>}/>
            <Route path='/user/*' element={
              <CallsProvider>
                <UserPage/>
              </CallsProvider>
            }/>
            <Route path='*' element={<div>Unknown. Please select the user page or admin page!</div>}/>
          </Routes>
        </div>
      </TagsProvider>
    </div>
  )
}

export default App

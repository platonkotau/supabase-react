import Notes from './Notes/Notes'
import Login from './Login/Login'
import Side_bar from './Side_bar/Side_bar'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Profile from './Profile/Profile'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'





  function App() {
  

    const [login, setLogin] = useState(null)
    const [page, setPage] = useState(null)

    useEffect(() => {
        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser()
            setLogin(user)
            if (user) {
              setPage('profile')
            }
            
        }
        checkUser()
        }, [])

    return(
        <div className='flex justify-center bg-gray-100'>
          <Routes>
            <Route path='notes/' element={<Notes setPage={setPage} setLogin={setLogin} />} />
            <Route path='profile/' element={<Profile setpage={setPage} setLogin={setLogin}/>} />
            <Route path='/' element={<Login setLogin={setLogin} setPage={setPage}/>} />
          </Routes>

          
            
              {login !== null ? <Side_bar setLogin={setLogin} setPage={setPage}/> : null}
        
            
        </div>  



    )
}



export default App

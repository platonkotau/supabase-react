import Notes from './Notes/Notes'
import Login from './Login/Login'
import Side_bar from './Side_bar/Side_bar'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Profile from './Profile/Profile'




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
        <div>
          
            <div className='bg-gray-100 flex justify-center min-h-screen'>
              {login === null ? <Side_bar setLogin={setLogin} setPage={setPage}/> : null}
        


              {page === 'notes' ? <Notes setPage={setPage} setLogin={setLogin} /> : page === 'profile' ? <Profile setpage={setPage} setLogin={setLogin}/> : <Login setLogin={setLogin} setPage={setPage}/>}
            </div>
        </div>  



    )
}



export default App

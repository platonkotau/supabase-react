import Notes from './Notes/Notes'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Login from './Login/Login'


  function App() {
    const [login, setLogin] = useState(null)

    useEffect(() => {
        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser()
            setLogin(user)
        }
        checkUser()
        }, [])

    return(
      <div className='bg-gray-100 flex justify-center min-h-screen'>
        

        {login ? <Notes setLogin={setLogin} /> : <Login setLogin={setLogin} />}
      </div>



    )
}



export default App

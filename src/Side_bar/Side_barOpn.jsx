import { useState } from 'react'
import { supabase } from '../supabaseClient'



function Side_barOpn({setLogin, setPage}){
    async function logout() {
        const {error} = await supabase.auth.signOut()
        setLogin(null)
        setPage(null)
    }

    return(
        <div className='rounded-sm border-gray-300'>
            <div>
                <button
                onClick={() => setPage('profile')}
                className='active:bg-blue-500'
                >Profile</button>

                <button
                onClick={() => setPage('notes')}
                >Notes</button>

                <button 
                onClick={logout}
                className=''>LogOut</button>
            </div>
        </div>
    )
}

export default Side_barOpn
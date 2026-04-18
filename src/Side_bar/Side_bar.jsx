import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import user_icon from '../assets/user_icon.png'
import notes from '../assets/notes.png'



function Side_bar({setLogin, setPage}){
    const [Cond, setCond] = useState(false)
    const navigate = useNavigate()

    async function logout() {
        await supabase.auth.signOut()
        setLogin(null)
        navigate('/')
    }

    return(
        <div 
        className={`fixed left-0 top-0 bg-white h-screen z-50 transition-all duration-200 ${Cond ? 'w-25' : 'w-10'}`}
        onMouseEnter={() => setCond(true)}
        onMouseLeave={() => setCond(false)}
        >
            <div className='flex flex-col p-0'>
                <div>
                    <button onClick={() => navigate('/profile')}>
                        <div className='flex justify-around'>
                            <img className='w-8 h-8' src={user_icon} />
                            <p className={`ml-2 mt-1 font-light transition-all duration-200 ${Cond ? 'opacity-100' : 'opacity-0'}`}
                            >Profile</p>
                        </div>
                    </button>

                    <button onClick={() => navigate('/notes')}>
                        <div className='flex justify-around'>
                            <img className='w-8 h-8' src={notes} /> 
                            <p className={`ml-2 mt-1 font-light transition-all duration-200 ${Cond ? 'opacity-100' : 'opacity-0'}`}
                            >Notes</p>
                        </div>
                    </button>
                
                
                    <button className={`rounded-sm bg-white p-2 border border-gray-300 ml-3 mb-2 fixed left-0 bottom-0 transition-all duration-100 ${Cond ? 'opacity-100' : 'opacity-0'}`}
                    onClick={logout}>LogOut</button>
                

                </div>
            </div>
        </div>
    )
}
export default Side_bar
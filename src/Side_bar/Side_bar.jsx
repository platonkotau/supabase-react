import { useState } from 'react'
import { supabase } from '../supabaseClient'
import Side_barCls from './Side_barCls'
import Side_barOpn from './Side_barOpn'



function Side_bar({setLogin, setPage}){
    const [Cond, setCond] = useState(false)


    return(
        <div 
        className='fixed top-0 left-0 h-screen bg-white z-50 px-3 rounded-sm border-gray-300'
        onMouseEnter={() => setCond(true)}
        onMouseLeave={() => setCond(false)}
        >
            {Cond ? <Side_barOpn setLogin={setLogin} setPage={setPage}/> : <Side_barCls />}
        </div>
    )
}

export default Side_bar
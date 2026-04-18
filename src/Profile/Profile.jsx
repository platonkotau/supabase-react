import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";


export default function Profile({setLogin , login}){
    const [profile, setProfile] = useState(null)

    async function createProfile() {
    const username = login.email.split('@')[0]
    
    const { error } = await supabase.from('profile').insert({
        user_id: login.id,
        username: username
    })

    console.log(error)


    }

    async function getProfile(){
    if (!login) return
    const { data, error } = await supabase.from('profile').select('*')
    if (data[0]) {
        setProfile(data[0])
    } else {
        await createProfile()
        await getProfile()
    }
}


    useEffect(() => {
        getProfile()
    }, [])


    return(
        <div className="border border-gray-300 px-10 my-3 rounded-sm bg-gray-50 min-h-screen shadow-md ">

            <div className="mt-10 bg-gray-50 flex border border-gray-300 h-30 w-175  justify-between">
                <div>
                  <img className="ml-20 mt-11 border border-gray-300" src="" alt="Profile photo" />
                </div>

                <div className="mt-10 mr-30">
                    {profile && <h1 className="font-semibold text-xl">{profile.username}</h1>}
                </div>
            </div>

            <div className="flex justify-center" >
                <div className="flex jus mt-10 bg-gray-50 border border-gray-300 h-50 w-150 gap-5">
                    <span>Telegram</span><br />
                    <span>Twitter</span><br />
                    <span>Facebook</span><br />
                    <span>Youtube</span><br />
                    <span>Discord</span>
                </div>
            </div>

        </div>
    )
}

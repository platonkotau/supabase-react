import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import App from "../App";
export default function Notes({setLogin}) {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [notes, setNotes] = useState([])
    const [edit, setEdit] = useState(null)
    const [Etitle, setEtitle] = useState('')
    const [Edesc, setEdesc] = useState('')

    async function logout() {
        const {error} = await supabase.auth.signOut()
        setLogin(null)
    }
    

    useEffect(() => {
        getNotes()
    }, [])



    async function addNote() {
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('notes').insert({
        user_id: user.id,
        name: title,
        descripiton: desc})

        getNotes() 

        setDesc('')
        setTitle('')
    }

    async function updateNote() {
        const { error } = await supabase.from('notes').update({name: Etitle, descripiton: Edesc}).eq('id', edit)
        getNotes()
        setEdit(null)
    }



    async function getNotes(){
        const { data, error } = await supabase.from('notes').select('*')
        setNotes(data)
    }


    async function deleteNote(id) {
        const { error } = await supabase.from('notes').delete().eq('id', id)
        getNotes() }
        



    return (
        <div>
            <div className="border border-gray-300 px-10 my-3 rounded-sm bg-gray-50 min-h-screen shadow-md" >
                    <br />
                <div className="flex gap-1 ">
                    <input  className='bg-white border border-gray-300 rounded-sm px-3 py-2' type="text" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)} />
                    <br />
                    <input className='bg-white border border-gray-300 rounded-sm px-3 py-2' type="text" value={desc} placeholder="description" onChange={(e) => setDesc(e.target.value)} />

                    <button  className='border border-gray-300 bg-white rounded-sm p-3 active:dark:bg-blue-300 hover:dark:bg-blue-100 text-gray-500' onClick={addNote}>+</button>
                </div>
                    <br />




                {notes.map(note => (
                    <div key={note.id} onClick={() => {
                        setEdit(note.id)
                        setEtitle(note.name)
                        setEdesc(note.descripiton)
                            }} >
                        <div className="border border-gray-300 bg-white rounded-sm p-3 flex flex-col my-2 max-w-l">
                            <div className=" flex justify-baseline flex-col max-w-l">
                                <h1 className="text-l font-semibold mb-0 leading-tight ">{note.name}</h1>
                                <p className="text-sm font-normal mt-0">{note.descripiton}</p>
                            </div>

                            <div className="flex justify-end">
                                <button className=' border border-gray-300 bg-white rounded-sm px-3 py-1 m-2 active:dark:bg-blue-300 hover:dark:bg-blue-100 text-gray-500' onClick={() => deleteNote(note.id)}>-</button>
                            </div>
                                

                            {edit === note.id && (
                            <div className='flex justify-center items-center' onClick={(e) => e.stopPropagation()}>
                                <input className="'bg-white border border-gray-300 rounded-sm px-3 py-2 mx-1" value={Etitle} onChange={(e) => setEtitle(e.target.value)} />
                                <input className="'bg-white border border-gray-300 rounded-sm px-3 py-2 mx-1" value={Edesc} onChange={(e) => setEdesc(e.target.value)} />
                                <button className=' border border-gray-300 bg-white rounded-sm px-3 py-2 m-2 active:dark:bg-blue-300 hover:dark:bg-blue-100 text-gray-500' onClick={updateNote}>Update</button>
                            </div>)}
                        </div>
                    </div>))} 
                        <br />
                </div>
                                <div className="flex justify-around">
                                    <button className= " bg-white rounded-sm px-3 py-2 m-2 active:dark:bg-blue-600 active:text-white  hover:dark:bg-blue-100 shadow-md" onClick={() => logout()}>LogOut</button>
                                </div>
            </div>
    )
}
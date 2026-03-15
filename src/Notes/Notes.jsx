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
        <div className="">
            <br />
            <div className="flex gap-1">
            <input  className='bg-white rounded-sm border-0.5 p-1' type="text" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)} />
            <br />
            <input className='bg-white rounded-sm border-0.5 p-1' type="text" value={desc} placeholder="description" onChange={(e) => setDesc(e.target.value)} />
            
            <button  className='bg-white rounded-sm p-3 active:dark:bg-blue-300 hover:dark:bg-blue-100' onClick={addNote}>+</button>
            </div>
            <br />
            
            


            {notes.map(note => (
                <div key={note.id} onClick={() => {
                    setEdit(note.id)
                    setEtitle(note.name)
                    setEdesc(note.descripiton)
                        }} >
                <div className="border-2 p-1 rounded-md flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold">{note.name}</h1>
                        <p className="text-sm font-light">{note.descripiton}</p>
                    </div>
                <button className='bg-white rounded-sm px-3 py-1 m-2 active:dark:bg-blue-300 hover:dark:bg-blue-100' onClick={() => deleteNote(note.id)}>-</button>
                </div>

                {edit === note.id && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <input className="bg-white rounded-sm border-0.5 p-1 mx-1" value={Etitle} onChange={(e) => setEtitle(e.target.value)} />
                        <input className="bg-white rounded-sm border-0.5 p-1 mx-1" value={Edesc} onChange={(e) => setEdesc(e.target.value)} />
                        <button className='bg-white rounded-sm px-2 py-1 m-1 active:dark:bg-blue-300 hover:dark:bg-blue-100' onClick={updateNote}>Update</button>
                    </div>
                )}
                </div>
            ))}

            <br />
        <button className="bg-white p-2 rounded-md active:dark:bg-blue-300 hover:dark:bg-blue-100" onClick={() => logout()}>LogOut</button>
        </div>
    )
}
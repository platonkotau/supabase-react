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
            <br />

            <input type="text" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)} />
            <br />
            <input type="text" value={desc} placeholder="description" onChange={(e) => setDesc(e.target.value)} />

            <button onClick={addNote}>+</button>
            


            {notes.map(note => (
                <div key={note.id} onClick={() => {
                    setEdit(note.id)
                    setEtitle(note.name)
                    setEdesc(note.descripiton)
                        }}>
                <h1>{note.name}</h1>
                <p>{note.descripiton}</p>
                <button onClick={() => deleteNote(note.id)}>-</button>
                {edit === note.id && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <input value={Etitle} onChange={(e) => setEtitle(e.target.value)}/>
                        <input value={Edesc} onChange={(e) => setEdesc(e.target.value)}/>
                        <button onClick={updateNote}>Update</button>
                    </div>
                )}
                </div>
            ))}

            <br />
        <button onClick={() => logout()}>LogOut</button>
        </div>
    )
}
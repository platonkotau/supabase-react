import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Notes() {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    async function addNote() {
    const { error } = await supabase.from('notes').insert({
        name: title,
        descripiton: desc})

        console.log('error:', error) // ← добавь это
    }

    return (
        <div>
            <br />

            <input type="text" value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)} />
            <br />
            <input type="text" value={desc} placeholder="description" onChange={(e) => setDesc(e.target.value)} />
            <br />
            <button onClick={addNote}>+</button>
            <button>edit</button>
            <button>-</button>
        </div>
    )
}
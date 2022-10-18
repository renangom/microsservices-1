import React from 'react'
import { useState } from 'react'
import './style.css'
import axios from 'axios';

export default function CreatePost () {
    
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:4000/posts', {
            title
        })

        setTitle("");
        
    }
  return (
    <div className='container'>
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Title</label>
                <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

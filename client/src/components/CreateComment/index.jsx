import React, { useState } from 'react'
import './style.css'
import axios from 'axios'

export default function CreateComment({postId}) {
    const [comment, setComment] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        await axios.post(`http://localhost:4001/post/${postId}/comments`, {
            content: comment
        })

        setComment("");

    }
  return (
    <div className='formulario'>
        <form onSubmit={handleSubmit} className="form">
            <div className='campo'>
                <label htmlFor='comment'>Comentário</label>
                <input name='comment' type="text" placeholder='Put your commentary here' onChange={e => setComment(e.target.value)} /> 
            </div>
            <button type='submit' className='btn btn-primary'> Comment </button>
        </form>
    </div>
  )
}

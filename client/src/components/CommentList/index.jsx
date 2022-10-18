import React from 'react'
import './style.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';

export default function CommentList({postId}) {
    const [comments, setComments] = useState([]);

    const fetchComments = async() => {
        const res = await axios.get(`http://localhost:4001/post/${postId}/comments`)

        setComments(res.data);
    }

    useEffect(() => {
        fetchComments();
    }, [comments])
  return (
    <ul className='commentList'>
        {comments.map((comment) => {
            return(
                <li className='contentList' key={comment.id}>{comment.content}</li>
            )
        })}
    </ul>
  )
}

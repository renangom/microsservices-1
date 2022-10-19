import React from 'react'
import './style.css'


export default function CommentList({comments}) {
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

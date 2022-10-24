import React from 'react'
import './style.css'


export default function CommentList({comments}) {
  
  return (
    <ul className='commentList'>
        {comments.map((comment) => {
          let content;

          if(comment.status === 'aproved'){
            content = comment.content
          }
          if(comment.status === 'pending'){
            content = "This comment is awaiting moderation"
          }
          if(comment.status === 'rejected'){
            content = 'This comment has been rejected'
          }
            return(
                <li className='contentList' key={comment.id}>{content}</li>
            )
        })}
    </ul>
  )
}

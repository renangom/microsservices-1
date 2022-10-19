import React from 'react'
import './style.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import CreateComment from '../CreateComment';
import CommentList from '../CommentList';


export default function Posts() {
    const [posts, setPosts] = useState({});
    useEffect(() => {
        const handlePosts = async () => {
            const res = await axios.get('http://localhost:4002/posts');
            console.log(res.data)
            setPosts(res.data.posts)
        }

        handlePosts();
    }, [])


    const renderedPosts = Object.values(posts).map((post) => {
      return (
        <div className='card' key={post.id}>
          <div className="card-body">
            <h3>{post.title}</h3>
          </div>
          <div className='comment'>
            <CommentList comments={post.comments} />
            <CreateComment postId={post.id} />
          </div>
        </div>
      )
    })
  return (
    <div className='posts'>
      <h1> Posts </h1>
      {renderedPosts}
    </div>
  )
}

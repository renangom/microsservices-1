const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());
const commentsByPostId = {};

app.get('/post/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/post/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const postId = req.params.id;
    const {content} = req.body;

    const comments = commentsByPostId[postId] || [];

    comments.push({id: commentId, content: content});

    commentsByPostId[postId] = comments;

    axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId
        }
    })
    res.status(201).send(comments);
})







app.listen(4001, () => {
    console.log('listening on port 4001');
})
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

    //criamos o comentários, precisamos enviar para o event-bus
    //o event-bus precisa enviar para o serviço de moderação e para o query service também
    comments.push({id: commentId, content: content, status:'pending'});

    commentsByPostId[postId] = comments;

    //enviando os dados para o  event-bus
    axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId,
            status:'pending'
        }
    })
    res.status(201).send(comments);
})

//recebendo aviso do event-bus
app.post('/events', async(req,res) => {
    console.log('Event received', req.body.type);

    const {type, data} = req.body;
    if(type === "CommentModerated"){
        const {postId, id, status, content} = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find((comment) => {
            return comment.id === id;
        });

        comment.status = status;

        await axios.post('http://localhost:4005/events',{
            type: 'CommentUpdated',
            data:{
                id,
                status,
                postId,
                content
            }
        })

    }
    res.send({});
})




app.listen(4001, () => {
    console.log('listening on port 4001');
})
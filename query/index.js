const express = require('express');
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors());


const posts = {};

app.get('/posts', (req,res)=> {
    res.send({posts})
})

app.post('/events', (req,res) => {
    const {type, data} = req.body;

    //eventos do tipo criação de post
    if(type === 'PostCreated'){
        const {id, title} = data;

        posts[id] = {id, title, comments: []};
    }

    //eventos do tipo comentário criado
    if(type === 'CommentCreated'){
        const {id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({id,content, status})
    }

    //eventos do comentário atualizado
    if(type === 'CommentUpdated'){
        const {id, content, postId, status} = data;

        const post = posts[postId];
        const comment = post.comments.find((comment) => {
            return comment.id === id
        });

        comment.status = status;
        comment.content = content;
    }
    console.log(posts)
    res.send({})
})

app.listen(4002, (req,res) => {
    console.log('Server is listenning on port 4002');
})
const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv');
app.use(express.json());
app.use(morgan('dev'));
const jwt = require('jsonwebtoken');
const env = require('./config');

const eleos_platform_key = process.env.eleos_platform_key;

// test data
const jwtToken = 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IllNTUlKIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IllNTUlKIiwiZXhwIjoxNjQ0NTQ2NTI1fQ.'
const Tok1 = jwtToken.split('.')[0]
const Tok2 = jwtToken.split('.')[1]
const Tok3 = 'nTUK26wJnVx93ev32nqEWybs6u00DlxohjS552K38ugWsbVcCaZ9hnO7FgnAl7CnPV8SFJ4cI1znc1eAo2RzEg'
const token = Tok1 + '.' + Tok2 + '.' + Tok3
//

const posts = [
    {
        username: 'Jimmy',
        title: 'Post 1'
    },
    {
        username: 'Kyle',
        title: 'Post 2'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => posts.username === req.user.name))
})

app.post('/login', (req, res) => {
    //const username = req.body.username;
    //console.log(req.body)    
    //console.log(username)
    //const user = { name: username };
    const user = { name: "Kyle" };
    console.log(user)
    const accessToken = jwt.sign(user, eleos_platform_key);
    res.json({ accessToken: accessToken });
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split('=')[1]
    if (authHeader == null) return res.sendStatus(401);

    jwt.verify(token, eleos_platform_key, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user =  user;
        next();
    });
}

app.listen(4000, () => console.log('App running on http//localhost:4000'));
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const env = require('./config');
const app = express();

const routes = require('./routes/index');

//keys
const api_key = process.env.api_key;
const eleos_platform_key = process.env.eleos_platform_key;
const user_key = process.env.user_key;

//to read .json file
const fs = require('fs');

// 
app
    .use(morgan('dev'))
    .use( express.json() )
    .use(express.static('public'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/api', routes)
    
/*
Routes:
url= https://jimmy-demo-service.herokuapp.com
           Messages =  url/api/messages/{handle}
User Authentication =  url/api/authenticate/{token}
              Loads =  url/api/loads
           Add user =  url/api/user
*/

app.listen(
    env.port,
    () => console.log(`App listening at http://localhost:${env.port}`)
);
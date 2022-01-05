const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const api_key = 'cIpBXj7m0OUnTzAYC229jhB7A0KigpKNVTmEXhuL3zw';
const eleos_platform_key = '1ItgMN26pdJ87Vt7gNxAP2';
const user_key = 'userkey'
//const url = http://
const fs = require('fs');
//const http = require('http');

// Middleware to convert to json
app.use( express.json() )



// make a function AuthenticateKey to check if the incoming Platform key against the stored key
/*
function AuthenticateKey () {
    let { EleosPlatformKey } = req.header.Eleos-Platform-Key
    if ( EleosPlatformKey != eleos_platform_key) {
        res.status(401).send({ message: 'The request has an invalid key'});
    }
};
*/

/*
function Authorization (req, res) {
    const { incomingApiKey } = req.body;

    if ( incomingApiKey != api_key ) {
        res.status(418).send({ message: 'The request has an invalid api key'});
    }
    if (!incomingApiKey) {
        res.status(418).send({ message: 'There is no api key'});
    }
    console.log ('Api key is ${incomingApiKey}')
}
*/

app.get('', (req, res) => {
    res.send('Hello World');
});

/*
app.get('/authenticate/:token', (req, res) => {
    AuthenticateKey();
    const { token } = req.body.api_token;
});
*/

app.get('/loads', (req, res) => {
 //   AuthenticateKey();
 //   Authorization();
    var myRequest = req.headers;
    console.log(myRequest);
    var myRequest2 = req.credentials;
    console.log(myRequest2);
    var myRequest3 = req.destination;
    console.log(myRequest3);
    var myRequest4 = req.referrer;
    console.log(myRequest4);
    var myRequest5 = req.url;
    console.log(myRequest5);
    if (myRequest.authorization == 'Token token='+user_key) {
        const jsondata = require('./loads.json');
        res.status(200).send(jsondata);
    }

    else {
        res.status(401).send({'Error': '401 Unauthorized'})
    }
    
    console.log (`Api key is ${myRequest.authorization}`);
});

/*
app.put('/messages/:id', (req, res) => {
    AuthenticateKey();
    const { id } = req.params;
});
*/

app.listen(
    PORT,
    () => console.log(`app listening at http://localhost:${PORT}`)
);


app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt:'SHIRT',
        size: 'large'
    })
});

app.post('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        res.status(418).send({ message: 'We need a logo!' })
    }

    res.send({
        tshirt: `SHIRT with your ${logo} and ID of ${id}`,
    });
});






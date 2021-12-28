const express = require('express');
const app = express();
//const PORT = 8080;
const PORT = process.env.PORT || 3000;

const api_key = 'cIpBXj7m0OUnTzAYC229jhB7A0KigpKNVTmEXhuL3zw';
const eleos_platform_key = '1ItgMN26pdJ87Vt7gNxAP2';
//const url = http://
const fs = require('fs');
const http = require('http');

// Middleware to convert to json
app.use( express.json() )

app.get('', (req, res) => {
    res.send('Hello World');
});

// make a function AuthenticateKey to check if the incoming Platform key against the stored key
/*
function AuthenticateKey () {
    let { EleosPlatformKey } = req.header.Eleos-Platform-Key
    if ( EleosPlatformKey != eleos_platform_key) {
        res.status(401).send({ message: 'The request has an invalid key'})
    }
};
*/

/*
app.get('/authenticate/:token', (req, res) => {
    AuthenticateKey();
    const { token } = res.body.api_token;
});
*/

app.get('/loads', (req, res) => {
 //   AuthenticateKey();
    fs.readFile(__dirname + '/' + 'loads.json', 'utf8', (err,data) => {
        res.end(data);
    });
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


/*
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
*/








const express = require('express');
const database = require('../database')
const jwt = require('jsonwebtoken')
const router = express.Router();

//
const testLoadData = require('../test_data/loads.json');
//


router
    .get('/', async (req, res) => {
        const head = req.headers.authorization;

        //testing try catch in case the token is not properly formatted with ='token'
        var Token 
        try {
            Token = head.split('=')[1]
        } catch (e) {
            console.error('Error with authorization format');
            res.status(500).send({'Error': '500 error with authorization format'});
            res.end();
        }
        const decoded = jwt.decode(Token);

        //testing try catch in case the payload cant catch the first variable
        var decodedName
        try {
            decodedName = Object.values(decoded)[0];
        } catch (e) {
            console.error('Error with token');
            res.status(500).send({'Error': '500 error with token'});
            res.end();
        }

        // if name doesnt come out of token return 401
        if (decodedName == null && decodedName == undefined) return res.sendStatus(401) 

        try {
            // get load JSON
            const loadData = await database.getValue('loads', `
                SELECT
                    loads
                FROM
                    user 
                WHERE
                    full_name = @decodedName
            `, {
                decodedName: decodedName
            });
            res.status(200).send(loadData);
        } catch (e) {
            console.error('Error getting database information');
            res.status(500).send({'Error': '500'});
            res.end();
        }
    });
module.exports = router;
const express = require('express');
const { load } = require('nodemon/lib/config');
const database = require('../database')
const jwt = require('jsonwebtoken')
const router = express.Router();

//
const testLoadData = require('../test_data/loads.json');
const { token } = require('morgan');
//


router
    .get('/', async (req, res) => {
        const head = req.headers.authorization;
        
        var Token 
        try {
            Token = head.split('=')[1]
        } catch (e) {
            console.error('Error with authorization format');
            res.status(500).send({'Error': '500 error with authorization format'});
            res.end();
        }

        //
        const heeders = req.headers;
        console.log('headers ');
        console.log(heeders);
        //

        const decoded = jwt.decode(Token);
        var decodedName
        try {
            decodedName = Object.values(decoded)[0];
        } catch (e) {
            console.error('Error with token');
            res.status(500).send({'Error': '500 error with token'});
            res.end();
        }

        console.log(decoded)
        console.log(decodedName)
        if (decodedName == null && decodedName == undefined) return res.sendStatus(401) 

        try {
            const loadData = await database.getValue('loads', `
                SELECT
                    loads
                FROM
                    user 
                WHERE
                    full_name = @full_name
            `, {
                full_name: decodedName
            });

            console.log(loadData);
            res.status(200).send(loadData);
        } catch (e) {
            console.error('Error getting database information');
            res.status(500).send({'Error': '500'});
            res.end();
        }
    });
module.exports = router;
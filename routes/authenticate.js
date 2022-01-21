const express = require('express')
const database = require('../database')
const jwt = require('jsonwebtoken')
//
const testUserData = require('../test_data/users.json');
//
const router = express.Router();

router
    .get('/:token', async (req, res) => {
        const { token } = req.params;
        const decoded = jwt.decode(token);
        // change http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier 
        // no object.values
        //testing try catch in case the payload cant catch the first variable
        var decodedName
        console.log(decodedName);
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
            //get userinfo JSON
            const userData = await database.getValue('userinfo', `
                SELECT
                    *
                FROM
                    user
                WHERE
                    full_name = @decodedName
            `, {
                decodedName: decodedName
            });

            // does userData >= 1, get l3ess queries
            
            //check if user exists
            const userExists = await database.exists(`
                SELECT
                    *
                FROM
                    user
                WHERE
                    full_name = @decodedName
            `, {
                decodedName: decodedName
            });
            
            // if user doesnt exist send 401
            if (!userExists) return res.sendStatus(401);

            //update api key
            await database.execute(`
                UPDATE 
                    user
                SET
                    api_token = @token
                WHERE
                    full_name = @decodedName
            `, {
                decodedName: decodedName,
                token: token
            });
            
            res.status(200).send(userData);
            res.end();
        } catch (e) {
            console.error('Error retreiving api token');
            res.status(500);
            res.end('Something wrong sir?')
        }

        
    })
module.exports = router;
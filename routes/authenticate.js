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
        var decoded = jwt.decode(token);
        console.log(decoded);
        var decodeName = Object.values(decoded)[0]
        console.log(decodeName)

        var heeders = req.headers;
        console.log('headers ');
        console.log(heeders);

        try {
            const user = await database.query(`
                SELECT
                    *
                FROM
                    user
                WHERE
                    full_name = @full_name
            `, {
                full_name: decodeName
            });
            
            console.log(user)
            /*
            await database.execute(`
                INSERT INTO user (
                    full_name,
                    api_token,
                    userinfo,
                    loads
                ) VALUES (
                    @fullName,
                    @apiToken,
                    @userinfo,
                    @loads
                )
            `, {
                fullName: body.name,
                apiToken: body.api_token,
                userinfo: body.userinfo,
                loads: body.loads
            });
            */
            res.status(200).send(testUserData);
            res.end();
        } catch (e) {
            console.error('Error retreiving api token');
            res.status(500);
            res.end('Something wrong sir?')
        }

        
    })
module.exports = router;
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
        console.log(token);
        console.log(process.env.eleos_platform_key)

        try {
            const user = await database.query(`
                SELECT
                    *
                FROM
                    user
                WHERE
                    api_token = @apiToken
            `, {
                apiToken: token
            });
            
            jwt.decode(token, (err, decoded) => {
                if (err) return res.sendStatus(403);
                console.log('decoded this /n')
                console.log(decoded)
            });

            res.status(200).send(testUserData);
            res.end();
        } catch (e) {
            console.error('Error retreiving api token');
            res.status(500);
            res.end('Something wrong sir?')
        }

        
    })
module.exports = router;
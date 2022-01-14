const express = require('express')
const database = require('../database')
const jwt = require('jsonwebtoken')
//
const testUserData = require('../test_data/users.json');
const { user } = require('pg/lib/defaults');
//
const router = express.Router();

router
    .get('/:token', async (req, res) => {
        const { token } = req.params;
        const decoded = jwt.decode(token);
        const decodedName = Object.values(decoded)[0];
    
        try {
            const userData = await database.query(`
                SELECT
                    *
                FROM
                    user
                WHERE
                    full_name = @full_name
            `, {
                full_name: decodedName
            });
            
            await database.execute(`
                UPDATE 
                    user
                SET
                    api_token = @token
                WHERE
                    full_name = @full_name
            `, {
                full_name: decodedName,
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
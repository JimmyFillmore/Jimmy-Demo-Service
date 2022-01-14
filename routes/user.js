const express = require('express')
const database = require('../database')

const router = express.Router();

// This is used for adding stuff to the database
router
    .get('/', async (req, res) => {
        const users = await database.query(`
            SELECT
                *
            FROM
                user
            ORDER BY
                full_name DESC
        `)
        /*
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.error(e);
        })
        .finally(() => {
            database.close();
        })
        */
        res.json(users);
    })
    
    .post('/', async (req, res) => {
        const body = req.body;

        try {
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
            res.status(200);
            res.end('Added user');
        } catch (e) {
            console.error('Error adding user');
            res.status(500);
            res.end('Does this user already exist?')
        }

        
    })    
    
    // apparently html cant DELETE so deletion through POST lol
    .post('/delete/', async (req, res) => {
        const body = req.body;
        console.log(body)
        try {
            await database.execute(`
                DELETE FROM
                    user
                WHERE
                    full_name = @deleteUser 
            `, {
                deleteUser: body.name
            });
            res.status(200);
            res.end('Deleted user');
        } catch (e) {
            console.error('Error deleting user');
            res.status(500);
            res.end('Check your username');
        }
    });
    
module.exports = router;



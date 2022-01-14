const express = require('express');
const { load } = require('nodemon/lib/config');
const database = require('../database')
const testLoadData = require('../test_data/loads.json');

const router = express.Router();

router
    .get('/', async (req, res) => {
        var head = req.headers.authorization;
        var heeders = req.headers;
        console.log('headers ');
        console.log(heeders);
        var token = head.replaceAll('Token token=','');
        //try {
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

            const loadData = await database.query(`
                SELECT
                    loads
                FROM
                    user 
                WHERE
                    api_token = @apiToken
            `, {
                apiToken: token
            });
            console.log(loadData);
            if (user.api_token = token) {                
                res.status(200).json(loadData);
            }
            else {
                console.error('Error retreiving api token');
                res.status(401).send({'Error': '401 Unauthorized'});
                res.end('Something wrong sir?');
            }

            // Check api token vs stored api token
            /*
            if (token == 'Token token='+user_key) {
                const loaddata = require('./loads.json'); //pretty sure this require is busted due to loads.json being outside folder
                res.status(200).send(loaddata);
            }
            else {
                res.status(401).send({'Error': '401 Unauthorized'});
            }
            
            console.log (`Api key is ${token}`);
            */
        /*} catch (e) {
            console.error('Error getting database information');
            res.status(500).send({'Error': '500'});
            res.end();
        }*/
    });
module.exports = router;
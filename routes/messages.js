const express = require('express')
const database = require('../database')

const router = express.Router();

router
    .put('/:handle', async (req, res) => {
        const { handle } = req.params;
        const body = req.body;
        
        // check if handle exists
        const checkHandle = await database.exists(`
            SELECT
                *
            FROM
                messages
            WHERE
                handle = @checkHandle
            `, {
                checkHandle: handle
            });
        
        // if handle does not exist, input into table // else duplicate handle
        if (!checkHandle) {
            try {
                await database.execute(`
                    INSERT INTO messages (
                        handle,
                        message
                    ) VALUES (
                        @handle,
                        @message
                    )
                `, {
                    handle: handle,
                    message: body.body
                });

                body.handle = handle;
                res.status(200);
                res.end('Added message to database');
            } catch (e) {
                console.error('Error putting message');
                res.status(400).send({'description': 'Bad request', 'code': '400'});
                res.end();
            };
        }
        // if duplicate send 200 and update message
        else {
            console.error('Duplicate handle');
            res.status(409).send({'description': 'Duplicate handle', 'code': '409'});
            res.end();
        }
    });
module.exports = router;

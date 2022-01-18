const express = require('express')
const database = require('../database')

const router = express.Router();

router
    .put('/:handle', async (req, res) => {
        const { handle } = req.params;
        const body = req.body;
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
    
        console.log(checkHandle);
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
                console.log(body);
                res.status(200);
                res.end('Added message to database');
            } catch (e) {
                console.error('Error putting message');
                res.status(400).send({'description': 'Bad request', 'code': '400'});
                res.end();
            };
        }
        else {
            console.error('Duplicate handle');
            res.status(409).send({'description': 'Duplicate handle', 'code': '409'});
            res.end();
        }
    });
module.exports = router;

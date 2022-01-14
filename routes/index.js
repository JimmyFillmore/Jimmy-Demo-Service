const express = require('express')

const router = express.Router();

router
    .use('/user', require('./user'))
    .use('/loads', require('./loads'))
    .use('/messages', require('./messages'))
    .use('/authenticate', require('./authenticate'));
module.exports = router;
const express = require('express');
const gameApi = require('./api/game');


const router = express.Router();

router.use('/games', gameApi);

module.exports = router;

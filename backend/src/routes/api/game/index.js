const express = require('express');
const GameRunningException = require('../../../exceptions/gameRunning');
const {Blackjack, Players: {Player}} = require('../../../domain');



const router = express.Router();


/**
 * Valid game validation middleware
 */
const existingGamevalidationMiddleware = (request, response, next) => {

    const game = Blackjack.getGame(request.params.uuid);

    if(game) {

        next();

    } else {

        response.sendStatus(404);
    }

};




/**
 * POST /api/games
 */
router.post('/', async (request, response) => {

    const game = Blackjack.newGame(new Player({name: request.body.name}));

    response.status(201);

    response.json(game.getStats());

});



/**
 * GET /api/games/:uuid
 */
router.get('/:uuid', existingGamevalidationMiddleware, async (request, response) => {

    const game = Blackjack.getGame(request.params.uuid);

    response.json(game.getStats());

});



/**
 * POST /api/games/:uuid/start
 */
router.post('/:uuid/start', existingGamevalidationMiddleware,  async (request, response) => {

    const game = Blackjack.getGame(request.params.uuid);

    game.start();

    response.json(game.getStats());

});


/**
 * POST /api/games/:uuid/restart
 */
router.post('/:uuid/restart', existingGamevalidationMiddleware,  async (request, response) => {

    const game = Blackjack.getGame(request.params.uuid);

    try {

        game.restart();

        response.json(game.getStats());

    } catch (ex) {

        if(ex instanceof GameRunningException) {

            response.status(400).send(ex.message);
        }

    }

});


/**
 * POST /api/games/:uuid/hit
 */
router.post('/:uuid/hit', existingGamevalidationMiddleware,  async (request, response) => {

    const game = Blackjack.getGame(request.params.uuid);

    game.hit();

    response.json(game.getStats());

});



/**
 * POST /api/games/:uuid/stand
 */
router.post('/:uuid/stand', existingGamevalidationMiddleware,  async (request, response) => {

    const game = Blackjack.getGame(request.params.uuid);

    await game.stand();

    response.json(game.getStats());

});


module.exports = router;

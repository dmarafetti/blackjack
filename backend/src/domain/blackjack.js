const {Dealer} = require("./players");
const Game = require('./game');
const {useTranslation} = require("../lang");



/**
 * Represents the blackjack game's room. This class is a singleton.
 *
 * @author diego
 * @since 1.0.0
 * @class
 */
class Blackjack {


    /**
     * @type {*}
     */
    #t = useTranslation();


    /**
     * @type {Map<any, any>}
     */
    games = new Map()


    /**
     * Create a new game's instance
     *
     * @param player {AbstractPlayer} A player
     */
    newGame (player) {

        const dealer = new Dealer(this.#t('DEALER_NAME'));

        const game = new Game({dealer, player});

        this.games.set(game.uuid, game);

        return game;

    }


    /**
     * Get a game by uuid
     *
     * @param uuid
     * @return {Game}
     */
    getGame (uuid) {

        return this.games.get(uuid);
    }

}

module.exports = new Blackjack(); // singleton

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


    /**
     * Does this game exist?
     *
     * @param uuid
     * @return {boolean}
     */
    hasGame (uuid) {

        return this.games.has(uuid);
    }

    /**
     * Deletes a game
     *
     * @param uuid
     */
    removeGame (uuid) {

       return this.games.delete(uuid);

    }


    /**
     * Clears all games
     */
    clearAll () {

        return this.games.clear();
    }


}

module.exports = new Blackjack(); // singleton

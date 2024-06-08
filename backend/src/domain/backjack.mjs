import {Dealer} from "./player.mjs";
import Game from "./game.mjs";
import i18n from "../lang/index.mjs";


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
    #t = i18n.useTranslation();


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

        const dealer = new Dealer(this.#t('dsadas'));

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


export default new Blackjack(); // singleton

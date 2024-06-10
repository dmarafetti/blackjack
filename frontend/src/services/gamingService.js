import AbstractService from "./abstractService.js";
import Game from "../domain/game";

/**
 * Blackjacj Gaming services. REST Implementation
 *
 * @author diego
 * @since 1.0.0
 * @class
 */
export default class GamingService extends AbstractService {


    /**
     * Starts new game
     *
     * @param params
     * @returns {Promise<Game>}
     */
    async startGame(params) {

        const stats = await this.doPost('/games', params);

        return Game.fromStats(stats);

    }


    /**
     * Start playing
     *
     * @param game
     * @returns {Promise<Game>}
     */
    async beginGame(game) {

        const stats = await this.doPost(`/games/${game.uuid}/start`, {});

        return Game.fromStats(stats);
    }


    /**
     * Player move: hit
     *
     * @param game
     * @returns {Promise<Game>}
     */
    async hit(game) {

        const stats = await this.doPost(`/games/${game.uuid}/hit`, {});

        return Game.fromStats(stats);
    }


    /**
     * Player move: stand
     *
     * @param game
     * @returns {Promise<Game>}
     */
    async stand(game) {

        const stats = await this.doPost(`/games/${game.uuid}/stand`, {});

        return Game.fromStats(stats);
    }


    /**
     * Restart the current game
     *
     * @param game
     * @returns {Promise<Game>}
     */
    async restart(game) {

        const stats = await this.doPost(`/games/${game.uuid}/restart`, {});

        return Game.fromStats(stats);
    }


}

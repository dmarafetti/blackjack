import AbstractService from "./abstractService.js";
import Game from "../domain/game";

/**
 *
 *
 * @author diego
 * @since 1.0.0
 */
export default class GamingService extends AbstractService {


    /**
     *
     * @param params
     * @returns {Promise<Game>}
     */
    async startGame(params) {

        const stats = await this.doPost('/games', params);

        return Game.fromStats(stats);

    }


    /**
     *
     * @param game
     * @returns {Promise<Game>}
     */
    async beginGame(game) {

        const stats = await this.doPost(`/games/${game.uuid}/start`, {});

        return Game.fromStats(stats);
    }


    /**
     *
     * @param game
     * @returns {Promise<Game>}
     */
    async hit(game) {

        const stats = await this.doPost(`/games/${game.uuid}/hit`, {});

        return Game.fromStats(stats);
    }


    /**
     *
     * @param game
     * @returns {Promise<Game>}
     */
    async stand(game) {

        const stats = await this.doPost(`/games/${game.uuid}/stand`, {});

        return Game.fromStats(stats);
    }


    /**
     *
     * @param game
     * @returns {Promise<Game>}
     */
    async restart(game) {

        const stats = await this.doPost(`/games/${game.uuid}/restart`, {});

        return Game.fromStats(stats);
    }


}

import {MainView} from '../views';

/**
 * Blackjack game controller
 *
 * @author diego
 * @since 1.0.0
 */
export default class Blackjack {

    /**
     *
     * @type {Service | GamingService}
     */
    #gamingService = null;

    /**
     * @type {Game}
     */
    #game = null;

    /**
     * View {MainView}
     */
    #mainView


    /**
     * @param props
     */
    constructor(props) {

        this.#gamingService = props.backend;

        this.#mainView = new MainView(this, props.containerEl);

        this.#mainView.render();

    }


    /**
     * Show game on screen
     */
    show () {

        this.#mainView.show();

    }



    /**
     * Start new game
     *
     * @param name
     * @return {Promise<void>}
     */
    async start({name}) {

        try {

            this.#game = await this.#gamingService.startGame({name});

            this.#mainView.showTable(this.#game)

        } catch (ex) {

            alert(ex.message);

            console.error(ex);
        }


    }


    /**
     * Begin game
     *
     * @return {Promise<void>}
     */
    async begin () {

        try {

            this.#game = await this.#gamingService.beginGame(this.#game);

            this.#mainView.refresh(this.#game);

        } catch (ex) {

            alert(ex.message)
        }
    }


    /**
     * Player's hit move
     *
     * @return {Promise<void>}
     */
    async hit () {

        try {

            this.#game = await this.#gamingService.hit(this.#game);

            this.#mainView.refresh(this.#game);

        } catch (ex) {

            alert(ex.message)
        }
    }

    /**
     * Player's stand move
     *
     * @return {Promise<void>}
     */
    async stand () {

        try {

            this.#mainView.faceUpDealerCards(this.#game);

            this.#game = await this.#gamingService.stand(this.#game);

            this.#mainView.refresh(this.#game);

        } catch (ex) {

            alert(ex.message)
        }

    }


    /**
     * Restart game
     *
     * @return {Promise<void>}
     */
    async restart () {

        try {

            this.#game = await this.#gamingService.restart(this.#game);

            this.#mainView.refresh(this.#game);

        } catch (ex) {

            alert(ex.message)
        }
    }


    /**
     * End game. Return to init screen
     *
     * @return {Promise<void>}
     */
    async end () {

        this.#game = null;

        this.#mainView.showInitScreen();
    }


    /**
     * Set gaming service
     *
     * @param service {Service}
     */
    setGamingService (service) {

        this.#gamingService = service;
    }


}

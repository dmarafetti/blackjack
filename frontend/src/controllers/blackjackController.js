import {FeedbackView, TableView, WelcomeView} from '../views';

/**
 * Blackjack game controller
 *
 * @author diego
 * @since 1.0.0
 */
export default class Blackjack {

    /**
     *
     * @type {GamingService}
     */
    #gamingService = null;

    /**
     * @type {Game}
     */
    #game = null;

    /**
     * @type {WelcomeView}
     */
    #welcomeView;

    /**
     * @type {TableView}
     */
    #tableView;


    /**
     * @type {FeedbackView}
     */
    #feedbackView;



    /**
     * @param props
     */
    constructor(props) {

        this.#gamingService = props.backend;

        this.#welcomeView = new WelcomeView(this);

        this.#tableView = new TableView(this);

        this.#feedbackView = new FeedbackView(this);

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

            this.#welcomeView.hide();

            this.#tableView.show(this.#game);

        } catch (ex) {

            alert(ex.message)
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

            this.#tableView.refresh(this.#game);

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

            this.#tableView.refresh(this.#game);

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

            this.#tableView.faceUpDealerCards(this.#game);

            this.#game = await this.#gamingService.stand(this.#game);

            this.#tableView.refresh(this.#game);

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

            this.#tableView.refresh(this.#game);

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

        this.#tableView.hide();

        this.#welcomeView.show();
    }

}

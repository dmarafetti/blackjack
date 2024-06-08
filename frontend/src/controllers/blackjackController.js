import {TableView, WelcomeView} from '../views';

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
     * @param props
     */
    constructor(props) {

        this.#gamingService = props.backend;

        this.#welcomeView = new WelcomeView(this);

        this.#tableView = new TableView(this);

    }



    async start({name}) {

        this.#game = await this.#gamingService.startGame({name});

        this.#welcomeView.hide();

        this.#tableView.show(this.#game);

    }


    async begin () {

        this.#game = await this.#gamingService.beginGame(this.#game);

        this.#tableView.refresh(this.#game);

    }

    async hit () {

        this.#game = await this.#gamingService.hit(this.#game);

        this.#tableView.refresh(this.#game);

    }

    async stand () {

        this.#tableView.faceUpDealerCards(this.#game);

        this.#game = await this.#gamingService.stand(this.#game);

        this.#tableView.refresh(this.#game);

    }

    async restart () {

        this.#game = await this.#gamingService.restart(this.#game);

        this.#tableView.refresh(this.#game);
    }


    async end () {

        this.#game = null;

        this.#tableView.hide();

        this.#welcomeView.show();
    }

}

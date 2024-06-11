import EventEmitter from "../commons/events";
import {TableView, WelcomeView} from "./index";

/**
 * Main app view
 *
 * @author diego
 * @since 1.0.0
 * @extends {EventEmitter}
 */
export default class MainView extends EventEmitter {

    /**
     * view's delegate
     *
     * @type {Blackjack}
     */
    #delegate;

    /**
     * @type {WelcomeView}
     */
    #welcomeView;

    /**
     * @type {TableView}
     */
    #tableView;

    /**
     * @type {Element}
     */
    #containerEl;

    /**
     *
     */
    constructor(delegate, containerEl) {

        super();

        this.#delegate = delegate;

        this.#containerEl = containerEl;

        this.#welcomeView = new WelcomeView(delegate, containerEl);

        this.#tableView = new TableView(delegate, containerEl);

    }


    /**
     * Show game on screen
     */
    show() {

        this.#containerEl.style['display'] = 'block';

    }

    /**
     * Show welcome
     */
    showInitScreen () {

        this.#tableView.hide();

        this.#welcomeView.show();
    }


    /**
     * Show table
     *
     * @param game {Game}
     */
    showTable (game) {

        this.#welcomeView.hide();

        this.#tableView.show(game);

    }

    /**
     * Refresh table data
     *
     * @param game {Game}
     */
    refresh (game) {

        this.#tableView.refresh(game);

    }

    /**
     * show dealer cards
     *
     * @param game {Game}
     */
    faceUpDealerCards (game) {

        this.#tableView.faceUpDealerCards(game);
    }


    /**
     * Render html
     */
    render () {

        this.#welcomeView.render();

        this.#tableView.render();

    }

}

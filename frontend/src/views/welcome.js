import '../styles/welcome.css';
import EventEmitter from "../commons/events.js";

/**
 * Welcome screen view
 *
 * @author diego
 * @since 1.0.0
 * @extends {EventEmitter}
 */
export default class WelcomeView extends EventEmitter {

    /**
     * view's delegate
     *
     * @type {Blackjack}
     */
    #delegate;


    /**
     *
     */
    constructor(delegate) {

        super();

        this.#delegate = delegate;

        this.screenEl = document.getElementById('start-screen');

        this.startButton = document.getElementById('start');

        this.inputName = document.getElementById('player_name_input');

        this.startButton.addEventListener('click', this.#onStartGame.bind(this));

        this.inputName.addEventListener('keyup', this.#onInputChange.bind(this));

    }


    /**
     *
     */
    show () {

        this.screenEl.classList.remove('hidden');

        this.inputName.value = '';
    }


    /**
     *
     */
    hide () {

        this.screenEl.classList.add('hidden');
    }


    /**
     * @param event
     */
    #onInputChange (event) {

        const value = event.target.value;

        this.startButton.disabled = !value;

    }


    /**
     * @param event
     */
    #onStartGame(event) {

        event.preventDefault();

        this.#delegate.start({name: this.inputName.value});

    }

}

import '../styles/actions.css';
import EventEmitter from "../commons/events.js";

/**
 *
 *
 * @author diego
 * @since 1.0.0
 * @class
 */
export default class ActionPanelView extends EventEmitter {

    /**
     * @type {Element}
     */
    #newGameButtonEl;

    /**
     * @type {Element}
     */
    #hitButtonEl;

    /**
     * @type {Element}
     */
    #standButtonEl;

    /**
     * @type {Element}
     */
    #againButtonEl;

    /**
     * @type {Element}
     */
    #exitButtonEl;


    /**
     * Create an action Panel view
     */
    constructor(newButtonId, hitButtonId, standButtonId, againButtonId, exitButtonId) {

        super();

        this.#newGameButtonEl = document.getElementById(newButtonId);
        this.#hitButtonEl = document.getElementById(hitButtonId);
        this.#standButtonEl = document.getElementById(standButtonId);
        this.#againButtonEl = document.getElementById(againButtonId);
        this.#exitButtonEl = document.getElementById(exitButtonId);

        this.#newGameButtonEl.addEventListener('click', () => this.dispatchEvent(ActionPanelView.ON_NEW_GAME_CLICK, {}));
        this.#hitButtonEl.addEventListener('click', () => this.dispatchEvent(ActionPanelView.ON_HIT_CLICK, {}));
        this.#standButtonEl.addEventListener('click', () => this.dispatchEvent(ActionPanelView.ON_STAND_CLICK, {}));
        this.#againButtonEl.addEventListener('click', () => this.dispatchEvent(ActionPanelView.ON_AGAIN_CLICK, {}));
        this.#exitButtonEl.addEventListener('click', () => this.dispatchEvent(ActionPanelView.ON_END_CLICK, {}));
    }

    /**
     * Start new game setup
     */
    startNewGameMode() {

        this.#newGameButtonEl.classList.remove('hidden');
        this.#hitButtonEl.classList.add('hidden');
        this.#standButtonEl.classList.add('hidden');
        this.#againButtonEl.classList.add('hidden');
        this.#exitButtonEl.classList.add('hidden');
        this.enableHitButton();
        this.enableStandButton();

    }

    /**
     * Playing setup
     */
    playingGameMode() {

        this.#newGameButtonEl.classList.add('hidden');
        this.#againButtonEl.classList.add('hidden');
        this.#exitButtonEl.classList.add('hidden');
        this.#hitButtonEl.classList.remove('hidden');
        this.#standButtonEl.classList.remove('hidden');
    }


    /**
     * Finished game setup
     */
    finishedGameMode() {

        this.#againButtonEl.classList.remove('hidden');
        this.#exitButtonEl.classList.remove('hidden');
        this.#newGameButtonEl.classList.add('hidden');
        this.#hitButtonEl.classList.add('hidden');
        this.#standButtonEl.classList.add('hidden');
    }


    enableHitButton() {

        this.#hitButtonEl.disabled = false;
    }


    disableHitButton() {

        this.#hitButtonEl.disabled = true;

    }

    enableStandButton() {

        this.#standButtonEl.disabled = false;
    }


    disableStandButton() {

        this.#standButtonEl.disabled = true;

    }


    static ON_NEW_GAME_CLICK = 'on-new-game';

    static ON_HIT_CLICK = 'on-hit';

    static ON_STAND_CLICK = 'on-stand';

    static ON_AGAIN_CLICK = 'on-again';

    static ON_END_CLICK = 'on-end';


}

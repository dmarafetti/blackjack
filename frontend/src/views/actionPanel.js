import EventEmitter from "../commons/events.js";

/**
 * Action Buttons View
 *
 * @author diego
 * @since 1.0.0
 * @class
 */
export default class ActionPanelView extends EventEmitter {

    /**
     * @type {Element}
     */
    #containerEl;

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
     * @constructor
     *
     * @param containerEl {Element}
     */
    constructor(containerEl) {

        super();

        this.#containerEl = containerEl;
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


    render () {

        this.#newGameButtonEl = document.createElement('button');
        this.#newGameButtonEl.id = 'new_game';
        this.#newGameButtonEl.className = 'board-button board-button--new';
        this.#newGameButtonEl.textContent = 'Deal';
        this.#containerEl.appendChild(this.#newGameButtonEl);

        this.#againButtonEl = document.createElement('button');
        this.#againButtonEl.id = 'again';
        this.#againButtonEl.className = 'board-button board-button--new';
        this.#againButtonEl.textContent = 'Play again?';
        this.#containerEl.appendChild(this.#againButtonEl);

        this.#exitButtonEl = document.createElement('button');
        this.#exitButtonEl.id = 'exit';
        this.#exitButtonEl.className = 'board-button board-button--stand';
        this.#exitButtonEl.textContent = 'Exit';
        this.#containerEl.appendChild(this.#exitButtonEl);

        this.#hitButtonEl = document.createElement('button');
        this.#hitButtonEl.id = 'hit';
        this.#hitButtonEl.className = 'board-button board-button--hit hidden';
        this.#hitButtonEl.textContent = 'Hit';
        this.#containerEl.appendChild(this.#hitButtonEl);

        this.#standButtonEl = document.createElement('button');
        this.#standButtonEl.id = 'stand';
        this.#standButtonEl.className = 'board-button board-button--stand hidden';
        this.#standButtonEl.textContent = 'Stand';
        this.#containerEl.appendChild(this.#standButtonEl);

        this.#newGameButtonEl.addEventListener('click', () => this.dispatchEvent(ActionPanelView.ON_NEW_GAME_CLICK, {}));
        this.#hitButtonEl.addEventListener('click', () => this.dispatchEvent(ActionPanelView.ON_HIT_CLICK, {}));
        this.#standButtonEl.addEventListener('click', () => this.dispatchEvent(ActionPanelView.ON_STAND_CLICK, {}));
        this.#againButtonEl.addEventListener('click', () => this.dispatchEvent(ActionPanelView.ON_AGAIN_CLICK, {}));
        this.#exitButtonEl.addEventListener('click', () => this.dispatchEvent(ActionPanelView.ON_END_CLICK, {}));

    }


    static ON_NEW_GAME_CLICK = 'on-new-game';

    static ON_HIT_CLICK = 'on-hit';

    static ON_STAND_CLICK = 'on-stand';

    static ON_AGAIN_CLICK = 'on-again';

    static ON_END_CLICK = 'on-end';


}

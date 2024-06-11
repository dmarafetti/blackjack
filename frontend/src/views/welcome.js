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
     * @constructor
     * @param delegate {Blackjack}
     * @param containeEl {Element}
     */
    constructor(delegate, containeEl) {

        super();

        this.#delegate = delegate;

        this.containerEl = containeEl;

    }


    /**
     * Show welcome
     */
    show () {

        this.screenEl.classList.remove('hidden');

        this.inputName.value = null;

        this.#doResetButton(null);
    }


    /**
     * Hide view
     */
    hide () {

        this.screenEl.classList.add('hidden');
    }


    /**
     * @param event
     */
    #onInputChange (event) {

        const value = event.target.value;

        this.#doResetButton(value);

    }

    /**
     * @param value
     */
    #doResetButton (value) {

        this.startButton.disabled = !value;
    }


    /**
     * @param event
     */
    #onStartGame(event) {

        event.preventDefault();

        this.#delegate.start({name: this.inputName.value});

    }


    render () {

        // Create the main container div
        this.screenEl = document.createElement('div');
        this.screenEl.id = 'start-screen';
        this.screenEl.className = 'screen screen__init';

        // Create the heading
        const heading = document.createElement('h1');
        heading.className = 'heading';
        heading.textContent = "Diego's Blackjack";
        this.screenEl.appendChild(heading);

        // Create the logo container div
        const logo = document.createElement('div');
        logo.className = 'logo';

        // Create the image element
        const img = document.createElement('img');
        img.src = '/cards.svg';
        img.alt = 'cards';
        logo.appendChild(img);
        this.screenEl.appendChild(logo);

        // Create the form element
        const form = document.createElement('form');
        form.className = 'start-form';

        // Create the label element
        const label = document.createElement('label');
        label.htmlFor = 'player';

        // Create the input element
        this.inputName = document.createElement('input');
        this.inputName.type = 'text';
        this.inputName.id = 'player_name_input';
        this.inputName.name = 'player_name';
        this.inputName.maxLength = 100;
        this.inputName.autocomplete = 'off';
        this.inputName.placeholder = 'enter your name...';
        label.appendChild(this.inputName);
        form.appendChild(label);
        this.inputName.addEventListener('keyup', this.#onInputChange.bind(this));

        // Create the button element
        this.startButton = document.createElement('button');
        this.startButton.id = 'start';
        this.startButton.type = 'submit';
        this.startButton.className = 'start-button';
        this.startButton.disabled = true;
        this.startButton.textContent = 'Play Now';
        form.appendChild(this.startButton);
        this.startButton.addEventListener('click', this.#onStartGame.bind(this));

        // Append the form to the main container
        this.screenEl.appendChild(form);

        // Append the main container to the body (or any other container)
        this.containerEl.appendChild(this.screenEl);

    }

}

import '../styles/feedback.css';
import EventEmitter from "../commons/events.js";

/**
 * Feedback screen view
 *
 * @author diego
 * @since 1.0.0
 * @extends {EventEmitter}
 */
export default class FeedbackView extends EventEmitter {

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

        this.screenEl = document.getElementById('feedback-panel');
        this.textEl = document.getElementById('feedback-message');
        this.closeBtn = document.getElementById('feedback-close');

        this.closeBtn.addEventListener('click', this.hide.bind(this));
    }


    /**
     *
     */
    show (message) {

        this.screenEl.classList.remove('hidden');
        this.textEl.innerHTML = message;
    }


    /**
     *
     */
    hide () {

        this.screenEl.classList.add('hidden');
    }


}

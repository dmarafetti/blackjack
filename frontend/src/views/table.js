import EventEmitter from "../commons/events.js";
import {ActionPanelView} from "./index.js";


/**
 *
 *
 *
 */
export default class TableView extends EventEmitter {

    /**
     * view's delegate
     */
    #delegate;


    /**
     * @type {ActionPanelView}
     */
    #actionPanelView;



    constructor(delagate) {

        super();

        this.#delegate = delagate;

        // get references
        this.screenEl = document.getElementById('table-screen');
        this.statusMessageEl = document.getElementById('status_message');
        this.dealerNameTextEl = document.getElementById('dealer_name');
        this.playerNameTextEl = document.getElementById('player_name');
        this.dealerScoreTextEl = document.getElementById('dealer_score');
        this.playerScoreTextEl = document.getElementById('player_score');
        this.dealerHandEl = document.getElementById('dealer_hand');
        this.playerHandEl = document.getElementById('player_hand');

        // buttons panel view

        this.#actionPanelView = new ActionPanelView('new_game', 'hit','stand', 'again', 'exit' );
        this.#actionPanelView.addEventListener(ActionPanelView.ON_NEW_GAME_CLICK, this.onNewGame.bind(this));
        this.#actionPanelView.addEventListener(ActionPanelView.ON_HIT_CLICK, this.onHit.bind(this));
        this.#actionPanelView.addEventListener(ActionPanelView.ON_STAND_CLICK, this.onStand.bind(this));
        this.#actionPanelView.addEventListener(ActionPanelView.ON_AGAIN_CLICK, this.onPlayAgain.bind(this));
        this.#actionPanelView.addEventListener(ActionPanelView.ON_END_CLICK, this.onEnd.bind(this));
        this.#actionPanelView.startNewGameMode();

    }

    show (game) {

        this.screenEl.classList.remove('hidden');

        this.#actionPanelView.startNewGameMode();

        this.refresh(game);

    }


    hide () {

        this.screenEl.classList.add('hidden');
    }


    refresh (game) {

        this.#setDealerName(game.dealer.name);
        this.#setDealerScore(game.dealer.score);
        this.#setPlayerName(game.player.name);
        this.#setPlayerScore(game.player.score);
        this.#setPlayerHand(game.player.cards);
        this.#setDealerHand(game.dealer.cards);
        this.#setStatus(game.status);

        if(!game.running && game.finished) {

            this.#actionPanelView.finishedGameMode();

        }

    }


    onNewGame () {

        this.#delegate.begin();

        this.#actionPanelView.playingGameMode();
    }


    onHit () {

        this.#delegate.hit();
    }


    onStand () {

        this.#actionPanelView.disableStandButton();

        this.#actionPanelView.disableHitButton();

        this.#setStatus('Dealer is playing');

        this.#delegate.stand();
    }


    onPlayAgain () {

        this.#delegate.restart();

        this.#actionPanelView.startNewGameMode();
    }


    onEnd () {

        this.#delegate.end();

    }


    faceUpDealerCards (game) {

        const facedDownCard = game.dealer.cards.find(card => card.facedDown);

        facedDownCard.facedDown = false;

        this.#setDealerHand(game.dealer.cards);

    }


    #setStatus (message) {

        this.statusMessageEl.innerHTML = message;
    }

    #setDealerName (name) {

        this.dealerNameTextEl.innerHTML = name
    }

    #setPlayerName (name) {

        this.playerNameTextEl.innerHTML = name
    }

    #setDealerScore (score) {

        this.dealerScoreTextEl.innerHTML = score || '_ _'
    }

    #setPlayerScore (score) {

        this.playerScoreTextEl.innerHTML = score || '_ _'
    }

    #setPlayerHand (cards) {

        this.#doSetHand(this.playerHandEl, cards);
    }

    #setDealerHand (cards) {

        this.#doSetHand(this.dealerHandEl, cards);

    }

    #doSetHand (el, cards) {

        el.innerHTML = '';

        cards.forEach(({suit, name, facedDown}) => {

            let img;

            if(facedDown) {

                img = `<img src="/src/assets/deck.svg" alt="faced down card"/>`;

            } else {

                img = `<img src="/src/assets/${suit}/${name}.svg" alt="${suit} ${name} card"/>`
            }

            const cardEl = document.createElement('div');

            cardEl.classList.add('card');

            cardEl.innerHTML = img;

            el.appendChild(cardEl);

        });

    }

}

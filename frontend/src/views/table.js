import EventEmitter from "../commons/events.js";
import {ActionPanelView} from "./index.js";


/**
 * Table view
 *
 * @author diego
 * @since 1.0.0
 */
export default class TableView extends EventEmitter {

    /**
     * view's delegate
     *
     * @type {Blackjack}
     */
    #delegate;


    /**
     * @type {Element}
     */
    #containerEl;


    /**
     * @type {ActionPanelView}
     */
    #actionPanelView;


    /**
     * @constructor
     * @param delegate {Blackjack}
     * @param containeEl {Element}
     */
    constructor(delegate, containeEl) {

        super();

        this.#containerEl = containeEl;

        this.#delegate = delegate;

    }


    /**
     * Show table
     *
     * @param game
     */
    show (game) {

        this.screenEl.classList.remove('hidden');

        this.#actionPanelView.startNewGameMode();

        this.refresh(game);

    }


    /**
     * Hide table
     */
    hide () {

        this.screenEl.classList.add('hidden');
    }


    /**
     * Redraw view with game data
     *
     * @param game
     */
    refresh (game) {

        this.#setDealerName(game.dealer.name);
        this.#setDealerScore(game.dealerMove ? game.dealer.score : '_ _');
        this.#setPlayerName(game.player.name);
        this.#setPlayerScore(game.player.score);
        this.#setPlayerHand(game.player.cards);
        this.#setDealerHand(game.dealer.cards);
        this.#setStatus(game.status);
        this.#setDeckSize(game.deckSize);

        if(!game.running && game.finished) {

            this.#actionPanelView.finishedGameMode();
        }
    }


    /**
     * On new game
     */
    onNewGame () {

        this.#delegate.begin();

        this.#actionPanelView.playingGameMode();
    }


    /**
     * Hit button pressed
     */
    onHit () {

        this.#delegate.hit();
    }


    /**
     * Stand button preseed
     */
    onStand () {

        this.#actionPanelView.disableStandButton();

        this.#actionPanelView.disableHitButton();

        this.#setStatus('Dealer is playing');

        this.#delegate.stand();
    }


    /**
     * Play again pressed
     */
    onPlayAgain () {

        this.#delegate.restart();

        this.#actionPanelView.startNewGameMode();
    }


    /**
     * Exit pressed
     */
    onEnd () {

        this.#delegate.end();

    }


    /**
     * Display dealer's cards
     *
     * @param game
     */
    faceUpDealerCards (game) {

        const facedDownCard = game.dealer.cards.find(card => card.facedDown);

        facedDownCard.facedDown = false;

        this.#setDealerHand(game.dealer.cards);

    }


    #setStatus (message) {

        this.statusMessageEl.innerHTML = message;
    }

    #setDeckSize (size) {

        this.deckSizeEl.innerHTML = size;
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

                img = `<img src="/hand.svg" alt="faced down card"/>`;

            } else {

                img = `<img src="/${suit}/${name}.svg" alt="${suit} ${name} card"/>`
            }

            const cardEl = document.createElement('div');

            cardEl.classList.add('card');

            cardEl.innerHTML = img;

            el.appendChild(cardEl);

        });

    }


    render() {

        // Create the main container div
        this.screenEl = document.createElement('div');
        this.screenEl.id = 'table-screen';
        this.screenEl.className = 'table hidden';

        // Create the dealer sector
        const dealer = document.createElement('div');
        dealer.id = 'dealer';
        dealer.className = 'sector sector__dealer';

        // Create the deck div
        const deck = document.createElement('div');
        deck.className = 'deck';

        // Create the first card div
        const card1 = document.createElement('div');
        card1.className = 'card';
        const img1 = document.createElement('img');
        img1.src = '/deck.svg';
        img1.alt = 'deck top';
        card1.appendChild(img1);
        deck.appendChild(card1);

        // Create the last card div
        const card2 = document.createElement('div');
        card2.className = 'card last';
        const img2 = document.createElement('img');
        img2.src = '/deck.svg';
        img2.alt = 'deck back';
        card2.appendChild(img2);
        deck.appendChild(card2);

        // Create the count paragraph
        const count = document.createElement('p');
        count.className = 'count';
        this.deckSizeEl = document.createElement('span');
        this.deckSizeEl.id = 'deck-count';
        this.deckSizeEl.textContent = '52';
        count.appendChild(this.deckSizeEl);
        deck.appendChild(count);

        // Append the deck to the dealer sector
        dealer.appendChild(deck);

        // Create the cards container for dealer
        const dealerCards = document.createElement('div');
        dealerCards.className = 'cards';

        // Create the dealer hand div
        this.dealerHandEl = document.createElement('div');
        this.dealerHandEl.id = 'dealer_hand';
        this.dealerHandEl.className = 'hand';
        dealerCards.appendChild(this.dealerHandEl);

        // Append the dealer cards to the dealer sector
        dealer.appendChild(dealerCards);

        // Create the dealer info div
        const dealerInfo = document.createElement('div');
        dealerInfo.className = 'info';

        // Create the dealer info content
        const dealerInfoContent = document.createElement('div');
        this.dealerNameTextEl = document.createElement('h4');
        this.dealerNameTextEl.id = 'dealer_name';
        this.dealerNameTextEl.className = 'info__name';
        this.dealerNameTextEl.textContent = 'Dealer';
        dealerInfoContent.appendChild(this.dealerNameTextEl);

        const dealerScore = document.createElement('p');
        dealerScore.className = 'info__score';
        this.dealerScoreTextEl = document.createElement('span');
        this.dealerScoreTextEl.id = 'dealer_score';
        this.dealerScoreTextEl.textContent = '_ _';
        dealerScore.appendChild(this.dealerScoreTextEl);
        dealerInfoContent.appendChild(dealerScore);

        // Append the dealer info content to the dealer info
        dealerInfo.appendChild(dealerInfoContent);

        // Append the dealer info to the dealer sector
        dealer.appendChild(dealerInfo);

        // Append the dealer sector to the table screen
        this.screenEl.appendChild(dealer);

        // Create the player sector
        const player = document.createElement('div');
        player.id = 'player';
        player.className = 'sector sector__player';

        // Create the cards container for player
        const playerCards = document.createElement('div');
        playerCards.className = 'cards';

        // Create the player hand div
        this.playerHandEl = document.createElement('div');
        this.playerHandEl.id = 'player_hand';
        this.playerHandEl.className = 'hand';
        playerCards.appendChild(this.playerHandEl);

        // Append the player cards to the player sector
        player.appendChild(playerCards);

        // Create the player info div
        const playerInfo = document.createElement('div');
        playerInfo.className = 'info';

        // Create the player info content
        this.playerNameTextEl = document.createElement('h4');
        this.playerNameTextEl.id = 'player_name';
        this.playerNameTextEl.className = 'info__name';
        this.playerNameTextEl.textContent = 'Player';
        playerInfo.appendChild(this.playerNameTextEl);

        const playerScore = document.createElement('p');
        playerScore.className = 'info__score';
        this.playerScoreTextEl = document.createElement('span');
        this.playerScoreTextEl.id = 'player_score';
        this.playerScoreTextEl.textContent = '_ _';
        playerInfo.appendChild(playerScore);
        playerScore.appendChild(this.playerScoreTextEl);

        // Append the player info to the player sector
        player.appendChild(playerInfo);

        // Append the player sector to the table screen
        this.screenEl.appendChild(player);

        // Create the message div
        const message = document.createElement('div');
        message.className = 'message';
        this.statusMessageEl = document.createElement('p');
        this.statusMessageEl.id = 'status_message';
        message.appendChild(this.statusMessageEl);

        // Append the message to the table screen
        this.screenEl.appendChild(message);

        // Create the controls div
        const controls = document.createElement('div');
        controls.id = 'controls';
        controls.className = 'controls';

        // Append the controls to the table screen
        this.screenEl.appendChild(controls);
        this.#containerEl.appendChild(this.screenEl);

        this.#actionPanelView = new ActionPanelView(controls);
        this.#actionPanelView.addEventListener(ActionPanelView.ON_NEW_GAME_CLICK, this.onNewGame.bind(this));
        this.#actionPanelView.addEventListener(ActionPanelView.ON_HIT_CLICK, this.onHit.bind(this));
        this.#actionPanelView.addEventListener(ActionPanelView.ON_STAND_CLICK, this.onStand.bind(this));
        this.#actionPanelView.addEventListener(ActionPanelView.ON_AGAIN_CLICK, this.onPlayAgain.bind(this));
        this.#actionPanelView.addEventListener(ActionPanelView.ON_END_CLICK, this.onEnd.bind(this));
        this.#actionPanelView.render();
        this.#actionPanelView.startNewGameMode();
    }

}

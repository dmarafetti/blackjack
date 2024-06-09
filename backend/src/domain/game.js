const crypto = require('node:crypto');
const GameRunningException = require('../exceptions/gameRunning');
const ActionNotAllowedException = require('../exceptions/actionNotAllowedException');
const Deck = require('./deck');
const {ObservableGame} = require('./observable');
const {useTranslation} = require("../lang");


/**
 * Represents an instance of a blackjack game
 *
 * @author diego
 * @since 1.0.0
 */
class Game extends ObservableGame {

    /**
     * @type {string}
     */
    uuid = '';

    /**
     * @type {Dealer}
     */
    dealer;


    /**
     * @type {Player}
     */
    player;


    /**
     * @type {Deck}
     */
    deck;


    /**
     * @type {boolean}
     */
    running = false;


    /**
     * @type {AbstractPlayer}
     */
    winner;


    /**
     *
     * @type {string}
     */
    status = '';


    /**
     * @type {false}
     */
    dealerMove = false;


    /**
     * @type {boolean}
     */
    finished = false;


    /**
     * @type {*}
     */
    #t = useTranslation()


    /**
     * Create a game
     *
     * @param dealer
     * @param player
     */
    constructor({dealer, player}) {

        super();

        this.uuid = crypto.randomUUID();
        this.dealer = dealer;
        this.player = player;
        this.deck = Deck.createDeck();
        this.status = this.#t('YOU_READY');

    }

    /**
     * Start the game. The dealer deals from their left ("first base") to their far right ("third base").
     */
    start() {

        this.running = true;
        this.dealerMove = false;

        // shuffle cards
        this.deck.shuffle();

        // initial deal
        this.player.receiveCard(this.deck.dealACard()); // C1
        this.dealer.receiveCard(this.deck.dealACard()); // C1
        this.player.receiveCard(this.deck.dealACard()); // C1,C2
        this.dealer.receiveFacedDownCard(this.deck.dealACard()); // C1,C2

        // validate first
        this.validate();

    }

    /**
     * Restart the current game. Reset scores and all cards are returned to the deck
     *
     * @throws {GameRunningException}
     */
    restart () {

        if(this.running && !this.finished) {

            throw new GameRunningException(this.uuid);
        }

        this.deck.addCards(this.player.returnCards());
        this.deck.addCards(this.dealer.returnCards());

        this.dealer.resetScore();
        this.player.resetScore();

        this.winner = null;
        this.status = '';
        this.running = false;
        this.finished = false;
        this.dealerMove = false;
    }


    /**
     * Hit. Player's move
     *
     */
    hit () {

        return new Promise((resolve, reject) => {

            if(!this.running) {

                reject(new ActionNotAllowedException(this.uuid, 'hit'));

            }

            // get a new card

            this.player.receiveCard(this.deck.dealACard());


            if(this.player.getPoints() > 21) {

                this.dealerMove = true;

                this.dealer.faceUpCards();

                this.finish(this.dealer, this.#t('OVER_21'));

                resolve();

                return;

            }

            if(this.player.hand.length === 5) {

                this.dealerMove = true;

                this.dealer.faceUpCards();

                this.finish(this.player, this.#t('PLAYER_REACH_5'));

                resolve();

                return;
            }

            if(this.player.getPoints() === 21) {

                this.dealerMove = true;

                this.dealer.faceUpCards();

                this.#doDealerMove(resolve);

                return;

            }


            // hit or stand ?

            resolve();

        });

    }


    /**
     * Player stands
     */
    stand () {

        return new Promise((resolve, reject) => {

            if(!this.running) {

                reject(new ActionNotAllowedException(this.uuid, 'stand'));

            }

            this.dealerMove = true;

            this.dealer.faceUpCards();

            this.#doDealerMove(resolve);

        });

    }


    /**
     * Dealer start playing
     *
     * @param cb
     */
    #doDealerMove (cb) {

        console.log('dealer move', this.dealer.getPoints(), cb);


        // face card up

        if (this.dealer.getHandSize() < 5 && this.dealer.getPoints() <= 16) {

            this.dealer.receiveCard(this.deck.dealACard());

            setTimeout(this.#doDealerMove.bind(this, cb), 2000);


        } else if (this.dealer.getPoints() > 21) {

            // win

            this.finish(this.player, this.#t('DEALER_OVER_21'));

            cb();


        } else if (this.dealer.getHandSize() === 5) {

            // loose

            this.finish(this.dealer, this.#t('DEALER_REACH_5'));

            cb();

        } else {

            const playerScore = this.player.getPoints();

            const dealerScore = this.dealer.getPoints();

            if (playerScore > dealerScore) {

                // win

                this.finish(this.player, playerScore === 21 ? this.#t('PLAYER_BLACKJACK') : this.#t('YOU_WINS'));

                cb();

                return;
            }

            if (playerScore < dealerScore) {

                // loose

                this.finish(this.dealer, dealerScore === 21 ? this.#t('DEALER_BLACKJACK') : this.#t('DEALER_WINS'));

                cb();

                return;
            }

            // loose tie

            this.finish(this.dealer, dealerScore === 21 ? this.#t('21_TIE') : this.#t('TIE'));

            cb();

        }

    }


    /**
     * Validate score
     */
    validate () {

        this.notify(Game.BEFORE_MOVE_VALIDATION, {dealer: this.dealer, player: this.player});

        this.#doMoveValidation();

        this.notify(Game.AFTER_MOVE_VALIDATION, {dealer: this.dealer, player: this.player});
    }


    /**
     * Effectevily validate the current move
     */
    #doMoveValidation () {

        const playerScore = this.player.getPoints();

        const dealerScore = this.dealer.getPoints();

        if (dealerScore === 21) {

            if (playerScore === 21) {

                this.dealerMove = true;

                this.dealer.faceUpCards();

                this.finish(this.dealer, this.#t('21_TIE'));

                return;

            } else {

                this.dealerMove = true;

                this.dealer.faceUpCards();

                this.finish(this.dealer, this.#t('DEALER_BLACKJACK'));

                return;
            }

        }

        if (playerScore === 21) {

            // end Game => "you have Blackjack.");

            this.dealerMove = true;

            this.dealer.faceUpCards();

            this.finish(this.player, this.#t('PLAYER_BLACKJACK'));

            return;

        }

        this.status = this.#t('HIT_OR_STAND');

    }



    /**
     * Finish current game
     *
     * @param winner
     * @param reason
     */
    finish(winner, reason) {

        this.winner = winner;
        this.status = reason;
        this.running = false;
        this.finished = true;
    }



    /**
     * Share game starts
     *
     * @return {Object}
     */
    getStats () {

        return {
            uuid: this.uuid,
            running: this.running,
            finished: this.finished,
            deckSize: this.deck.size(),
            dealer: this.dealer.getStats(),
            player: this.player.getStats(),
            status: this.status,
            dealerMove: this.dealerMove
        }

    }


    static BEFORE_MOVE_VALIDATION = 'before_move_validation';

    static AFTER_MOVE_VALIDATION = 'after_move_validation';


}

module.exports = Game;

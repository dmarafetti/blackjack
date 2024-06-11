const {Observable} = require("./observable");

/**
 * Represents a person playing cards
 *
 * @author diego
 * @since 1.0.0
 */
class AbstractPlayer extends Observable {

    /**
     * @type {string}
     */
    name = '';

    /**
     * @type {number}
     */
    points = 0;

    /**
     * @type {[]}
     */
    hand = [];


    constructor({name}) {

        super();

        this.name = name;
    }


    /**
     * Receives one card and add it to its hand
     *
     * @param card {Card}
     */
    receiveCard (card) {

        this.hand.push(card);

        this.notify(AbstractPlayer.RECEIVED_CARD, {player: this}); // join point

        this.#updatePoints(card.value);

    }


    hasBlackjack () {

        return this.getPoints() === 21;
    }


    /**
     * Get player's point. Calculate its total taking aces into account
     *
     * @returns {number}
     */
    getPoints () {

        let total = 0;
        let hasAce = false;

        this.hand.forEach((card) => {

            total += Math.min(10, card.value);

            if(card.name === 'A') {

                hasAce = true;
            }

        });

        if(total + 10 <= 21 && hasAce) {

            total = total + 10; // ace sums 11. otherwise is 1
        }

        return total;
    }

    /**
     * Get hands size
     *
     * @returns {number}
     */
    getHandSize () {

        return this.hand.length;
    }


    /**
     * Represents the action of returning cards to the deck.
     *
     * @returns {Cards[]} array of cards
     */
    returnCards () {

        return this.hand.splice(0);
    }

    /**
     * Resets the score
     */
    resetScore () {

        this.points = 0;
    }


    #updatePoints (value) {

        this.points = this.points + value;

    }

    /**
     * Get player's stats
     *
     * @return {Object}
     */
    getStats() {

        return {

            name: this.name,
            cards: this.hand,
            score: this.getPoints()


        }

    }

    static RECEIVED_CARD = 'received_card';


}

module.exports = AbstractPlayer;

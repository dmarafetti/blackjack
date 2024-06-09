const Card = require('./card');
const OutOfCardsException = require('../exceptions/outOfCardsException');


/**
 * Represents a standard 52-card French-suited deck
 *
 * @author diego
 * @since 1.0.0
 * @class
 *
 */
class Deck {

    /**
     * Array of cards
     *
     * @type {Card[]}
     */
    cards = [];


    /**
     * Creates a deck
     *
     * @param cards
     */
    constructor(cards) {

        this.cards = cards;

    }


    /**
     * @returns {*}
     */
    dealACard() {

        if(this.cards.length === 0) {

            throw new OutOfCardsException();
        }

        return this.cards.shift();
    }


    /**
     * @param cards
     */
    addCards (cards) {

        cards.forEach(card => this.cards.push(card));
    }


    /**
     * @returns {number}
     */
    size () {

        return this.cards.length;
    }


    /**
     * Shuffle deck using Fisher-Yates Sorting Algorithm
     *
     * @returns {Deck}
     */
    shuffle () {

        for (let i = this.cards.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];

        }

        return this;

    }


    /**
     * Factory method to create an instance of a deck
     */
    static createDeck() {

        const suits = ['hearts', 'spades', 'clubs', 'diamonds'];

        const values = [
            {name: '2', value: 2},
            {name: '3', value: 3},
            {name: '4', value: 4},
            {name: '5', value: 5},
            {name: '6', value: 6},
            {name: '7', value: 7},
            {name: '8', value: 8},
            {name: '9', value: 9},
            {name: '10', value: 10},
            {name: 'J', value: 10},
            {name: 'K', value: 10},
            {name: 'Q', value: 10},
            {name: 'A', value: 1}

        ];

        const cards = [];

        suits.forEach(suit => {

            values.forEach(({name, value}) => {

                cards.push(new Card({suit, name, value}));

            });


        });

        return new Deck(cards);
    }
}

module.exports = Deck;


/**
 *  Represents a card of a standard 52-card deck French-suited
 *
 * @author diego
 * @since 1.0.0
 */
class Card {

    /**
     *
     * @type {null}
     */
    suit;


    /**
     *
     * @type {""}
     */
    name;

    /**
     *
     * @type {null}
     */
    value;


    /**
     * @type {false}
     */
    facedDown = false;


    /**
     * Creates a card
     *
     * @param suit
     * @param name
     * @param value
     */
    constructor({suit, name, value}) {

        this.suit = suit;
        this.name = name;
        this.value = value;
    }

    /**
     * Face-down card
     */
    faceDown () {

        this.facedDown = true;
    }

    /**
     * Face-up card
     */
    faceUp () {

        this.facedDown = false;
    }

}

module.exports = Card;

import {AbstractPlayer} from "./abstractPlayer.mjs";


/**
 *  Represents a concrete player
 *
 * @author diego
 * @since 1.0.0
 * @extends AbstractPlayer
 */
export class Player extends AbstractPlayer {

    /**
     * Creates a player
     *
     * @param name
     */
    constructor({name}) {

        super({name});
    }


}



/**
 *  Represents the dealer
 *
 * @author diego
 * @since 1.0.0
 * @extends AbstractPlayer
 */
export class Dealer extends AbstractPlayer {

    /**
     * Creates the Dealer
     *
     * @param name
     */
    constructor(name) {

        super({name});
    }


    /**
     * Face-up all cards
     */
    faceUpCards () {

        this.hand.forEach(card => card.faceUp());

    }

    /**
     * Receive a card a face-down it
     *
     * @param card {Card} A card
     */
    receiveFacedDownCard (card) {

        card.faceDown();

        this.receiveCard(card);

    }

}

export default {Player, Dealer};

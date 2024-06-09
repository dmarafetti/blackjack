/**
 * No more cards exception
 *
 * @author diego
 * @since 1.0.0
 * @extends {Error}
 */
class OutOfCardsException extends Error {

    constructor() {

        let message = `Deck ran out of cards`;

        super(message);

    }

}

module.exports = OutOfCardsException;

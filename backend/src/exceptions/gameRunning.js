/**
 * Game running exception
 *
 * @author diego
 * @since 1.0.0
 * @extends {Error}
 */
class GameRunningException extends Error {

    constructor(uuid) {

        let message = `The game ${uuid} is still running`

        super(message);

    }

}

module.exports = GameRunningException;

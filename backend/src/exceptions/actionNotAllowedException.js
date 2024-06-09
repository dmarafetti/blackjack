/**
 * Action not allowed exception
 *
 * @author diego
 * @since 1.0.0
 * @extends {Error}
 */
class ActionNotAllowedException extends Error {

    constructor(uuid, action) {

        let message = `The ${action} is not allows at this time. The game ${uuid} might be stopped.`

        super(message);

    }

}

module.exports = ActionNotAllowedException;

/**
 * An observer
 *
 * @author diego
 * @since 1.0.0
 */
class Observer {

    /**
     * Receive a notification from an observable
     */
    notify(topic, payload) {

        throw new Error('You have to implement the Notify method');
    }

}


/**
 * Observable object implementation
 *
 * @author diego
 * @since 1.0.0
 * @abstract
 */
class Observable {

    /**
     * @type {Object}
     */
    #observers = {};

    /**
     * Observe events on a given topic
     *
     * @param {String} topic
     * @param observer
     */
    observe(topic, observer) {

        if (this.#observers[topic] === undefined) {

            this.#observers[topic] = [];
        }

        this.#observers[topic].push(observer);
    }


    /**
     * Notify all observer a given event, or state change occurs
     *
     * @param topic
     * @param payload
     */
    notify(topic, payload) {

        try {

            if (this.#observers[topic] === undefined) return;

            this.#observers[topic].forEach(observer => {

                observer.notify(payload);

            })

        } catch (ex) {

            console.warn(ex);
        }

    }
}


module.exports = {Observable, Observer}

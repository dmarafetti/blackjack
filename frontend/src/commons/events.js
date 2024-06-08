/**
 * Represents an event
 *
 * @author diego
 * @since 1.0.0
 * @class
 */
export class Event {

    constructor(topic, payload) {

        this.topic = topic;
        this.payload = payload;
    }
}


/**
 * Event emitter implementation
 *
 * @author diego
 * @since 1.0.0
 * @abstract
 */
export default class EventEmitter {

    /**
     * @type {Object}
     */
    #callbacks = {};

    /**
     * Sets up a listener
     *
     * @param {String} topic
     * @param callback
     */
    addEventListener(topic, callback) {

        if (typeof callback !== "function") return;

        if (this.#callbacks[topic] === undefined) {

            this.#callbacks[topic] = [];
        }

        this.#callbacks[topic].push(callback);
    }


    /**
     * Dispatch events to all listeners
     *
     * @param topic
     * @param payload
     */
    dispatchEvent(topic, payload) {

        if (this.#callbacks[topic] === undefined) return;

        this.#callbacks[topic].forEach(callback => {

            callback(new Event(topic, payload));

        })
    }
}

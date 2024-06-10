import Service from "./service";

/**
 * REST Abstract methods
 *
 * @author diego
 * @since 1.0.0
 * @abstract
 */
export default class AbstractService extends Service {

    /**
     * @type string
     */
    #backendUrl = '';


    /**
     * @param host
     * @param port
     * @constructor
     */
    constructor({host, port}) {

        super();

        if(!host || !port) throw new Error('Missing host or port');

        this.#backendUrl = `${host}:${port}/api`;

    }


    /**
     * HTTP GET
     *
     * @param path
     * @returns {Promise<any>}
     */
    async doGet(path) {

        try {

            const res = await fetch(`${this.#backendUrl}${path}`);

            return res.json();

        } catch (ex) {

            throw new Error('Communication failed. Please try again later.');
        }
    }


    /**
     * HTTP POST
     *
     * @param path
     * @param postData
     * @returns {Promise<any>}
     */
    async doPost(path, postData) {

        try {

            const res = await fetch(`${this.#backendUrl}${path}`, {
                method: 'POST',
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(postData)
            });

            return res.json();

        } catch (ex) {

            throw new Error('Communication failed. Please try again later.');
        }

    };


}

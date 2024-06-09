/**
 *
 *
 * @author diego
 * @since 1.0.0
 */
export default class AbstractService {

    /**
     * @type string
     */
    #backendUrl = 'http://localhost:8000/api';


    /**
     *
     * @param host
     * @param port
     */
    constructor({host, port}) {

        if(!host || !port) throw new Error('Missing host or port');

        this.#backendUrl = `${host}:${port}/api`;

    }


    /**
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

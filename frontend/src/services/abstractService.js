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

        const res = await fetch(`${this.#backendUrl}${path}`);
        return res.json();
    }


    /**
     *
     * @param path
     * @param postData
     * @returns {Promise<any>}
     */
    async doPost(path, postData) {

        const res = await fetch(`${this.#backendUrl}${path}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(postData)
        });

        return res.json();
    };


}

import {readFile} from 'fs/promises'

/**
 * I18n (Internationalization) module
 *
 * @author diego
 * @since 1.0.0
 * @class
 *
 */
class i18n {

    /**
     * Fallbacks in en-US if no lang is selected.
     *
     * @type {string}
     */
    #locale = 'en-US';


    /**
     * Language codes
     *
     * @type {*}
     */
    #dictionary = {};


    /**
     * Initialize with locale file
     *
     */
    init() {

        readFile(new URL('./lang.json', import.meta.url), 'utf8').then(data => {

            try {

                Object.assign(this.#dictionary, JSON.parse(data));

            } catch (ex) {

                // silent catch
            }

        });

    }


    /**
     * Set locale
     *
     * @param code
     */
    setLocale(code = 'en-US') {

        this.#locale = code;
    }


    /**
     * Returns the translation function.
     *
     * @returns {function(*): *}
     */
    useTranslation() {

        const currentDic = this.#dictionary;

        const currentLang = this.#locale;

        return function t (key) {

            return currentDic[currentLang][key] || key;
        };

    }


}

export default new i18n();

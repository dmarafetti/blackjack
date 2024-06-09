const langFile = require('./lang.json');


/**
 * Returns the translation function.
 *
 * @returns {function(*): *}
 */
function useTranslation(locale = 'en-US') {

    return function t (key) {

        return langFile[locale][key] || key;
    };

}

module.exports = {useTranslation}



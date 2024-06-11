import './styles/style.css';
import './styles/actions.css';
import './styles/feedback.css';
import './styles/table.css';
import './styles/welcome.css';
import Blackjack from "./controllers/blackjackController";
import GamingService from "./services/gamingService";



/**
 * Entry point. Bootstrap application when document is loaded
 *
 * @param selector {String} css selector
 * @param cb {Function} callback
 */
export function bootstrap(selector, cb) {

    window.addEventListener('load', () => {

        if (window.document.readyState !== 'complete') {

            console.warn('Bootstrapping can be used only when document is already loaded.');

            return false;
        }

        let nodes = window.document.querySelectorAll(selector);

        nodes.forEach((node) => {

            // merge environment variables

            const env = new Map(Object.entries(import.meta.env));

            cb(node, env);

        });

    });
}


bootstrap('#blackjack', (nodeEl, params) => {

    const containerEl = document.getElementById('blackjack');
    const host = params.get('VITE_BACKEND_HOST');
    const port = params.get('VITE_BACKEND_PORT');
    const backend = new GamingService({host, port});

    window.blackjack = new Blackjack({backend, containerEl});
    window.blackjack.show();

});

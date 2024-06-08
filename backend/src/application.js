const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const router = require('./routes');
const i18n = require('./lang');


const { NODE_LOCAL_PORT} = process.env;

/**
 *
 * @return {Promise<void>}
 */
function bootstrap() {

    // Setup express.js app

    const app = express();

    // Logging

    app.use(morgan('dev'));

    // json content type handling

    app.use(express.json());


    // configure CORS

    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 204
    }));


    // Enabled i18n support

    i18n.setLocale('en-US');

    i18n.init();


    // register api routes

    app.use('/api', router);



    // Bootstrap web server

    const port = NODE_LOCAL_PORT || 3001;

    app.listen(port, () => {

      console.log(`Blackjack listening on port ${port}...`)

    });



    // Graceful shutdown

    process.once('SIGHUP', () => {

        console.log('server stopped');

    });

}


module.exports = {bootstrap};





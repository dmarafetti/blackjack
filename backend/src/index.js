import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.mjs';
import i18n from './lang/index.mjs';

const { NODE_LOCAL_PORT} = process.env;

/**
 *
 * @return {Promise<void>}
 */
export default async function bootstrap() {

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


};









import express from 'express';
import cors from 'cors';
import {stdout} from 'node:process';
import morgan from 'morgan';
import router from './routes/index.mjs';
import i18n from './lang/index.mjs';

const { NODE_DOCKER_PORT} = process.env;


stdout.write(' ____  _                  _       ____  _            _     _            _    \n');
stdout.write('|  _ \\(_) ___  __ _  ___ ( )___  | __ )| | __ _  ___| | __(_) __ _  ___| | __\n');
stdout.write('| | | | |/ _ \\/ _` |/ _ \\|// __| |  _ \\| |/ _` |/ __| |/ /| |/ _` |/ __| |/ /\n');
stdout.write('| |_| | |  __/ (_| | (_) | \\__ \\ | |_) | | (_| | (__|   < | | (_| | (__|   <\n');
stdout.write('|____/|_|\\___|\\__, |\\___/  |___/ |____/|_|\\__,_|\\___|_|\\_\\/ |\\__,_|\\___|_|\\_\\\n');
stdout.write('              |___/                                     |__/\n');
stdout.write('\n\n');




(async function bootstrap() {

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

    const port = NODE_DOCKER_PORT || 8000;

    app.listen(port, () => {

      console.log(`Blackjack listening on port ${port}...`)

    });



    // Graceful shutdown

    process.once('SIGHUP', () => {

        console.log('server stopped');

    });


})();









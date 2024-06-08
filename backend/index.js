const {stdout} = require('node:process');
const {bootstrap} = require("./src/application");

stdout.write(' ____  _                  _       ____  _            _     _            _    \n');
stdout.write('|  _ \\(_) ___  __ _  ___ ( )___  | __ )| | __ _  ___| | __(_) __ _  ___| | __\n');
stdout.write('| | | | |/ _ \\/ _` |/ _ \\|// __| |  _ \\| |/ _` |/ __| |/ /| |/ _` |/ __| |/ /\n');
stdout.write('| |_| | |  __/ (_| | (_) | \\__ \\ | |_) | | (_| | (__|   < | | (_| | (__|   <\n');
stdout.write('|____/|_|\\___|\\__, |\\___/  |___/ |____/|_|\\__,_|\\___|_|\\_\\/ |\\__,_|\\___|_|\\_\\\n');
stdout.write('              |___/                                     |__/\n');
stdout.write('\n\n');

//
// run server
//
bootstrap();

import process from 'node:process';
import mongoose from 'mongoose';
import expressServer from './router/express-setup';
import webSocketServer from './socket/socket';

mongoose.connection.on('open', () => {
    // console.log(ref);
    console.log('Connected to mongo server.');
});

mongoose.connection.on('error', error => {
    console.log('Could not connect to mongo server!');
    console.log(error);
});

// mongoose.set('debug', true);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dev0.agidxfk.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {dbName: process.env.DB_NAME}); // eslint-disable-line @typescript-eslint/no-floating-promises

//------

const portNumber: number = (Number(process.env.AUTH_SERVER_PORT) || 9000);

expressServer.listen(portNumber, () => {
    console.log('Server started on port ' + portNumber);
});

//------

webSocketServer.listen(Number(process.env.SOCKET_SERVER_PORT));

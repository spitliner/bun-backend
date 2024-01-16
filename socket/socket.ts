import * as socketIO from 'socket.io';
import { type SocketType } from '../type/socket-type';
import chatListener from './socket-chat';
import { type ClientToServerEvents, type ServerToClientEvents, type InterServerEvents, type SocketData } from './socket-interface';

const webSocketServer = new socketIO.Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>();

const onConnection = (socket: SocketType) => {
    chatListener(webSocketServer, socket);
};

webSocketServer.on('connection', onConnection);

export default webSocketServer;

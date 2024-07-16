import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { config } from './config'
import { SocketHandler } from './sockets/SocketHandler';
import { Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = config.port;

const socketHandler = new SocketHandler(io);
io.on('connection', (socket: Socket) => socketHandler.handleConnection(socket));

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
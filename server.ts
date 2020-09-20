import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import config from 'config';
import path from 'path';
import http from 'http';
import SocketIO from 'socket.io';
import cors from 'cors';

import { indexRouter } from './src/routes/chat/chat-router';
import { ServerActions } from './src/utils/server-utils';
import { MessageType } from './src/models/message-model';
import { socketController } from './src/controllers/socket-controller';
import { errorHandler, notFoundHandler } from './src/middleware/error-handling';

const app: Express = express();
const port = config.get('Server.port') as string;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('*', notFoundHandler);
app.use(errorHandler);


const socketServer = SocketIO(config.get('Server.socketPort') as number);
socketServer.on(MessageType.CONNECTION, socketController.onConnection);

const httpServer = http.createServer(app);
const serverActions = ServerActions(httpServer, port);

httpServer.on('error', serverActions.onError);
httpServer.on('listening', serverActions.onListening);
httpServer.listen(port);

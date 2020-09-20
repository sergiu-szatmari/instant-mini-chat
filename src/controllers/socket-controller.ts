import { Socket } from 'socket.io';
import { Message, MessageType } from '../models/message-model';

class SocketController {
  onConnection = async (socket: Socket): Promise<void> => {
    console.log('New client connected');
    // console.log(`Socket ID: "${ socket.id }"`);

    socket.on(MessageType.CONNECTION_REPLY, this.onNewUser(socket));
    socket.on(MessageType.MESSAGE, this.onMessage(socket));
    socket.on(MessageType.NOTIFICATION, this.onNotification(socket));

    socket.emit(MessageType.CONNECTION_REPLY, { user: 'server', message: 'Welcome' } as Message);
  };

  onNewUser = (socket: Socket) => {
    return (message: Message): void => {
      console.log(`[ onNewUser ][ Socket ID: ${ socket.id } ][ ${ message.user } ] "${ message.message }"`);
      const response: Message = { user: 'Server', message: `${ message.user } has joined the chat` };

      socket.broadcast.emit(MessageType.NOTIFICATION, response);
      socket.emit(MessageType.NOTIFICATION, response);
    }
  }

  onMessage = (socket: Socket) => {
    return (message: Message): void => {

      console.log(`[ onMessage ][ ${ message.user } ] "${ message.message }"`);
      socket.broadcast.emit(MessageType.MESSAGE, message);
    };
  }

  onNotification = (socket: Socket) => {
    return (message: Message): void => {

      console.log(`[ onNotification ][ ${ message.user } ] "${ message.message }"`);
      socket.emit(MessageType.NOTIFICATION, message);
      socket.broadcast.emit(MessageType.NOTIFICATION, message);
    }
  }
}

export const socketController = new SocketController();

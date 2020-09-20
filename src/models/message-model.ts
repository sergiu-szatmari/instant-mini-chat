export enum MessageType {
  CONNECTION = 'connection',
  CONNECTION_REPLY = 'onConnectionReply',

  MESSAGE = 'onMessage',
  NOTIFICATION = 'onNotification',
  DISCONNECT = 'disconnect'
}

export interface Message {
  // type: MessageType;
  user: string;
  message: string;
}

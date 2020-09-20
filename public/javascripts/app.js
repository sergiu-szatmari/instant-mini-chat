const serverURL = 'http://localhost:8080';

const $ = (selector) => document.querySelector(selector);
const button = $('button');
const input = $('input');
const messageContainer = $('#message-container');
const socket = io(serverURL);


const MessageType = {
    CONNECTION: 'connection',
    CONNECTION_REPLY: 'onConnectionReply',
    MESSAGE: 'onMessage',
    NOTIFICATION: 'onNotification'
};

function Message(message) {
    return { user, message };
}

function addMessage(message) {
    const direction = message.user === user ? 'to' : 'from';
    const wrapper = document.createElement('div');
    wrapper.classList.add(`message-wrapper-${ direction }`);

    const container = document.createElement('div');
    container.classList.add('message');
    container.classList.add(direction);
    container.innerHTML = `${ message.user === user ? 'Me' : message.user }: ${ message.message }`;

    wrapper.appendChild(container);
    messageContainer.appendChild(wrapper);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function addNotification(notification) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('message-wrapper-notification');

    const container = document.createElement('div');
    container.classList.add('notification');
    container.innerHTML = notification.message;

    wrapper.appendChild(container);
    messageContainer.appendChild(wrapper);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function onSendMessage() {
    const message = Message(input.value);
    input.value = '';
    socket.emit(MessageType.MESSAGE, message);
    addMessage(message);
}

socket.on(MessageType.CONNECTION_REPLY, () => {
    console.log(`Connected as ${ user }`);
    const message = Message(`${ user } has joined the chat`);
    socket.emit(MessageType.NOTIFICATION, message);
});

socket.on(MessageType.MESSAGE, (message) => {
    console.log({ message });
    addMessage(message);
});

socket.on(MessageType.NOTIFICATION, (notification) => {
    console.log({ notification });
    addNotification(notification);
});

window.addEventListener('beforeunload', () => {
    socket.emit(MessageType.NOTIFICATION, Message(`${ user } has disconnected`));
});

button.addEventListener('click', onSendMessage);
messageContainer.scrollTop = messageContainer.scrollHeight;


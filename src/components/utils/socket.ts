const { io } = require('socket.io-client');

const Socket = io('https://chat-app-backend-beige-three.vercel.app/');

export default Socket;

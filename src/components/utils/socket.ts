const { io } = require('socket.io-client');

const Socket = io('http://localhost:5000');

export default Socket;

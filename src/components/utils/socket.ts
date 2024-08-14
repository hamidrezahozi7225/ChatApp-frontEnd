const { io } = require('socket.io-client');

const Socket = io('https://chatapp-backend-production-3645.up.railway.app/');

export default Socket;

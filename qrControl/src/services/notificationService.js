let io;

const initializeSocket = (httpServer) => {
  io = require('socket.io')(httpServer, {
    cors: {
      origin: '*', // Configura esto según tus necesidades
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

const sendNotification = (userId, message) => {
  if (io) {
    io.to(userId).emit('notification', message);
  } else {
    console.error('Socket.io not initialized');
  }
};

module.exports = {
  initializeSocket,
  sendNotification,
};

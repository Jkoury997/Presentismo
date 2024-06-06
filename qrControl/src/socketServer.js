const http = require('http');
const { initializeSocket } = require('./services/notificationService');

const PORT = 8080;

// Crear servidor HTTP y servidor Socket.IO
const httpServer = http.createServer();

// Inicializar Socket.IO
initializeSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Socket.IO Server running on port ${PORT}`);
});

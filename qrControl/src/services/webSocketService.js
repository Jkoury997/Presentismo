const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

const wss = new WebSocket.Server({ port: process.env.WEBSOCKET_PORT });
const clients = new Map();

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    return null;
  }
};

wss.on('connection', (ws, req) => {
  const token = req.headers['sec-websocket-protocol'];
  const userId = getUserIdFromToken(token);

  if (!userId) {
    ws.close(1008, 'Unauthorized');
    return;
  }

  clients.set(userId, ws);

  ws.on('message', (message) => {
    console.log(`Received message from ${userId} => ${message}`);
  });

  ws.on('close', () => {
    clients.delete(userId);
  });

  ws.send('WebSocket server connected');
});

const sendNotificationToUser = (userId, message) => {
  const client = clients.get(userId);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(message);
  }
};

module.exports = { sendNotificationToUser };

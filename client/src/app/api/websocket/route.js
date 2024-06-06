import { NextApiRequest, NextApiResponse } from 'next';
import http from 'http';

const URL_WEBSOCKET_SERVER = 'http://localhost:8080'; // URL de tu servidor WebSocket HTTP

export default function handler(req, res) {
  if (!req.socket.server.io) {
    console.log('Socket is initializing');
    const server = http.createServer((req, res) => {
      res.writeHead(404);
      res.end();
    });

    const io = require('socket.io')(server, {
      path: '/api/websocket', // Ruta en la que el servidor WebSocket estará escuchando
      addTrailingSlash: false,
      transports: ['websocket'],
    });

    io.on('connection', (socket) => {
      console.log('A client connected');
      socket.on('message', (message) => {
        console.log('Message from client:', message);
        socket.send('Hello from server');
      });

      socket.on('disconnect', () => {
        console.log('A client disconnected');
      });
    });

    server.listen(8080, () => {
      console.log('WebSocket server listening on port 8080');
    });

    req.socket.server.io = io;
  }
  res.end();
}

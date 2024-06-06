module.exports = {
    apps: [
      {
        name: 'Websocket',
        script: 'bun',
        args: 'run src/socketServer.js',
        interpreter: 'none',  // Esto le dice a PM2 que no use el intérprete de Node.js
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
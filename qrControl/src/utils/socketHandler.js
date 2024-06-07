const users = {};

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('join', (useruuid) => {
            users[useruuid] = socket.id;
            console.log(`Usuario ${useruuid} registrado con socket ID ${socket.id}`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
            for (const useruuid in users) {
                if (users[useruuid] === socket.id) {
                    delete users[useruuid];
                    break;
                }
            }
        });
    });
};

const sendNotification = (useruuid, message, io) => {
    const socketID = users[useruuid];
    if (socketID) {
        io.to(socketID).emit('notification', message);
    }
};

module.exports = {
    socketHandler,
    sendNotification
};

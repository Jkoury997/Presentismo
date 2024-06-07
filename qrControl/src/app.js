const express = require('express');
const connectDB = require('./database/db');
const mainRoute = require('./routes/mainRoute');
const morgan = require('morgan');
const cors = require('cors');
require('./utils/cronJobs');
const { errorHandler } = require('./middlewares/errorMiddleware');
const socketIO = require("socket.io");
const http = require("http");
const { socketHandler } = require('./utils/socketHandler');

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(errorHandler);

// Configurar trust proxy si estás detrás de un proxy
app.set('trust proxy', true);

let server = http.createServer(app);
let io = socketIO(server);

// Usar el manejador de Socket.IO
socketHandler(io);

// Hacer io accesible en los controladores
app.set('socketio', io);

// Conectar a MongoDB y luego iniciar el servidor
connectDB().then(() => {
    app.use('/api', mainRoute);

    server.listen(PORT, () => {
        console.log(`API Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
});

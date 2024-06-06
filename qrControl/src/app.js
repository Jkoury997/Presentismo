const express = require('express');
const connectDB = require('./database/db');
const mainRoute = require('./routes/mainRoute');
const morgan = require('morgan');
const cors = require('cors');
require('./utils/cronJobs');
const { errorHandler } = require('./middlewares/errorMiddleware');
const http = require('http');
const { initializeSocket } = require('./services/notificationService'); // Importa el módulo de notificaciones

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(errorHandler);
// Configurar trust proxy si estás detrás de un proxy
app.set('trust proxy', true);

// Crear servidor HTTP y servidor Socket.IO
const httpServer = http.createServer(app);

// Inicializar Socket.IO
initializeSocket(httpServer);

// Conectar a MongoDB y luego iniciar el servidor
connectDB().then(() => {
    app.use('/api', mainRoute);

    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
});

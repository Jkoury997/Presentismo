// controllers/notificationController.js
const { sendNotification } = require('../utils/socketHandler');

const notifyUser = (req, res) => {
    const { userID, message } = req.body;
    const io = req.app.get('socketio'); // Obtener io desde la aplicación

    sendNotification(userID, message, io);
    res.status(200).send('Notificación enviada');
};

module.exports = {
    notifyUser
};

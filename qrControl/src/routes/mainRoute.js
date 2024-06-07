// routes/mainRoutes.js

const qrRoute = require("./qrRoute")
const atendanceRoute = require("./atendanceRoute")
const zoneRoute = require("./zoneRoute")
const notificationRoutes = require('./notificationRoutes');


const express = require("express")

const router = express.Router();

router.use('/qr', qrRoute);
router.use('/attendance', atendanceRoute);
router.use('/zones', zoneRoute);
router.use('/notifications', notificationRoutes);

module.exports = router
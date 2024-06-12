// routes/mainRoutes.js

const qrRoute = require("./qrRoute")
const atendanceRoute = require("./atendanceRoute")
const zoneRoute = require("./zoneRoute")
const notificationRoutes = require('./notificationRoutes');
const analyticsRoute = require('./analyticsRoute');


const express = require("express")

const router = express.Router();

router.use('/qr', qrRoute);
router.use('/attendance', atendanceRoute);
router.use('/zones', zoneRoute);
router.use('/notifications', notificationRoutes);
router.use('/analytics',analyticsRoute)

module.exports = router
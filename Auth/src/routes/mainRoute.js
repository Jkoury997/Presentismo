// routes/userRoutes.js

const authRoute = require("./authRoute")
const recoveryRoute = require("./recoveryRoute")
const tokenRoute = require("./tokenRoute")
const userRoute = require("./userRouter")
const deviceRoute = require("./deviceRoute")

const express = require("express")

const router = express.Router();

router.use('/auth', authRoute); //Seguridad completa
router.use('/recovery', recoveryRoute); //No necesita Seguridad
router.use('/token', tokenRoute);
router.use('/user', userRoute);
router.use('/device', deviceRoute);


module.exports = router
const express = require('express');
const router = express.Router();
const {refreshAccessToken} = require("../controllers/tokenController")

router.post('/refresh', refreshAccessToken); // Nueva ruta para obtener un nuevo token de acceso

module.exports = router;
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:useruuid', userController.getUser);
router.get('/email/:email', userController.getUserByEmail);

module.exports = router;

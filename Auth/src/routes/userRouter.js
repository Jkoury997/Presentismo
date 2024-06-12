const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();


router.get("/list",userController.listAll)
router.get('/:useruuid', userController.getUser);
router.get('/email/:email', userController.getUserByEmail);

router.put('/update/:uuid', userController.updateUser);
router.patch('/deactivate/:uuid', userController.deactivateUser);


module.exports = router;

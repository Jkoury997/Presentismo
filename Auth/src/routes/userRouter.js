const { verifyToken, authorizeRoles, authorizeRolesOrSelf } = require('../middlewares/authMiddleware');
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/list', verifyToken, authorizeRoles('admin', 'recursos_humanos'), userController.listAll);
router.get('/:useruuid', userController.getUser);
router.get('/email/:email', verifyToken, authorizeRoles('admin', 'recursos_humanos'), userController.getUserByEmail);

router.put('/update/:uuid', verifyToken, authorizeRolesOrSelf('admin', 'recursos_humanos'), userController.updateUser);
router.patch('/deactivate/:uuid', verifyToken, authorizeRoles('admin','recursos_humanos'), userController.deactivateUser);

module.exports = router;
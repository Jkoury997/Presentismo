const { verifyToken,authorizeRoles } =require ('../middlewares/authMiddleware');

const express = require('express');
const zoneController = require('../controllers/zoneController');
const validateRequest = require('../middlewares/validateRequest');
const { validateZoneCreation, validateZoneUpdate } = require('../validators/zoneValidator');

const router = express.Router();

router.post(
  '/',
  validateZoneCreation,
  validateRequest,
  verifyToken,
  authorizeRoles('admin', 'recursos_humanos'),
  zoneController.createZone
);

router.get('/', zoneController.getZones);
router.get('/:uuid', zoneController.getZoneByuuid);

router.put(
  '/:id',
  validateZoneUpdate,
  validateRequest,
  verifyToken,
  zoneController.updateZone
);

router.delete('/:id',verifyToken,authorizeRoles('admin', 'recursos_humanos'), zoneController.deleteZone);

router.post('/link-device', zoneController.linkDeviceToZone); // Nueva ruta
router.post('/verify', zoneController.verifyZoneAndDevice); // Nueva ruta para verificar zona y dispositivo

module.exports = router;

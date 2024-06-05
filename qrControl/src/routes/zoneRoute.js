const express = require('express');
const zoneController = require('../controllers/zoneController');
const validateRequest = require('../middlewares/validateRequest');
const { validateZoneCreation, validateZoneUpdate } = require('../validators/zoneValidator');

const router = express.Router();

router.post(
  '/',
  validateZoneCreation,
  validateRequest,
  zoneController.createZone
);

router.get('/', zoneController.getZones);
router.get('/:id', zoneController.getZoneById);

router.put(
  '/:id',
  validateZoneUpdate,
  validateRequest,
  zoneController.updateZone
);

router.delete('/:id', zoneController.deleteZone);

router.post('/link-device', zoneController.linkDeviceToZone); // Nueva ruta
router.post('/verify', zoneController.verifyZoneAndDevice); // Nueva ruta para verificar zona y dispositivo

module.exports = router;

const deviceService = require('../services/deviceService');
const { generateOtp, sendOtpEmail, verifyOtp } = require('../services/otpService');
const User = require('../database/models/User');
const { v4: uuidv4 } = require('uuid');


async function getDevice(req, res) {
  try {
    const device = await deviceService.getDevice(req.params.uuid);
    res.status(200).json(device);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

const requestDeviceUpdateOtp = async (req, res) => {
  try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const otp = await generateOtp(user.uuid, email);
      await sendOtpEmail(email, otp);

      res.status(200).json({ message: 'OTP sent for device update' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const updateDeviceWithOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("Email:", email, "OTP:", otp);

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await verifyOtp(user.uuid, otp);
    console.log("OTP verified");

    const newDeviceUuid = uuidv4();
    console.log("Generated new device UUID:", newDeviceUuid);

    const updatedDevice = await deviceService.updateDevice(user.uuid, newDeviceUuid);
    console.log("Updated device:", updatedDevice);

    res.status(200).json({ message: 'Device updated successfully', device: updatedDevice });
  } catch (error) {
    console.error("Error in updateDeviceWithOtp:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDevice,
  requestDeviceUpdateOtp,
  updateDeviceWithOtp
};

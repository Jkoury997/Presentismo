
const { generateOtp, sendOtpEmail, verifyOtp } = require('../services/otpService');
const { revokeTokens} = require('../services/tokenService');
const User = require('../database/models/User');


const requestOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const otp = await generateOtp(user.uuid, email);
        await sendOtpEmail(email, otp);

        res.status(200).json({ message: 'OTP sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await verifyOtp(user.uuid, otp);

        // Actualizar la contraseña sin hashearla aquí
        user.password = newPassword;
        // Desbloquear el usuario
        user.failedLoginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();

        // Revocar todos los refresh tokens
        await revokeTokens(user.uuid);

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = { requestOtp, resetPassword };

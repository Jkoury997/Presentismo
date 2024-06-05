const { generateAccessToken, verifyRefreshToken } = require('../services/tokenService');


const refreshAccessToken = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }

    try {
        const decoded = await verifyRefreshToken(token);
        const accessToken = generateAccessToken(decoded.id,decoded.uuid);
        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};

module.exports = {refreshAccessToken}
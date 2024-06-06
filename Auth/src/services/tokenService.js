const jwt = require('jsonwebtoken');
const Token = require('../database/models/Token');

const generateAccessToken = (id, uuid, role) => {
    return jwt.sign({ id, uuid, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const generateRefreshToken = async (id, role, ip) => {
    const token = jwt.sign({ id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 días
    await Token.create({ token, userUuid: id, ip, expiresAt });
    return token;
};

const revokeTokens = async (userUuid) => {
    await Token.deleteMany({ userUuid });
};

const verifyRefreshToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const tokenRecord = await Token.findOne({ token });

        if (!tokenRecord) {
            throw new Error('Invalid refresh token');
        }

        if (tokenRecord.expiresAt < new Date()) {
            throw new Error('Refresh token expired');
        }

        return decoded;
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
};

module.exports = { generateAccessToken, generateRefreshToken, revokeTokens, verifyRefreshToken };


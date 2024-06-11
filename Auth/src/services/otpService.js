const Otp = require('../database/models/Otp');
const fs = require('fs');
const path = require('path');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const otpEmailTemplatePath = path.join(__dirname, '../templates/otpEmailTemplate.html');
const htmlTemplate = fs.readFileSync(otpEmailTemplatePath, 'utf8');

const generateOtp = async (userUuid, email) => {
    const otp = speakeasy.totp({
        secret: process.env.OTP_SECRET,
        encoding: 'base32',
        step: 300 // OTP válido por 5 minutos
    });

    const expiresAt = new Date(Date.now() + 300000); // 5 minutos en milisegundos

    await Otp.create({ otp, userUuid, email, expiresAt });
    return otp;
};


const sendOtpEmail = async (email, otp) => {
    let HtmlTemplateWithOtp = htmlTemplate.replace('{{otpCode}}', otp);
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST, // El servidor SMTP proporcionado
        port: process.env.SMTP_PORT, // El puerto SMTP para SSL
        secure: true, // true para una conexión segura SSL
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD // Tu contraseña SMTP
        },
        tls: {
            // Esto es necesario si el servidor tiene un certificado auto-firmado
            // En producción, debes tener un certificado válido y eliminar esta línea
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: process.env.SMTP_USERNAME,
        to: email,
        subject: 'Your OTP Code',
        html: HtmlTemplateWithOtp // Utiliza la plantilla aquí
    };

    await transporter.sendMail(mailOptions);
};

const verifyOtp = async (userUuid, otp) => {
    const otpRecord = await Otp.findOne({ userUuid, otp });
    console.log(otpRecord)

    if (!otpRecord) {
        throw new Error('Invalid OTP');
    }

    if (otpRecord.expiresAt < new Date()) {
        throw new Error('OTP expired');
    }

    return true;
};

module.exports = { generateOtp, sendOtpEmail, verifyOtp };

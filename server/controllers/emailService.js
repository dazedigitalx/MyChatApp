// controllers/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Your email
        pass: process.env.GMAIL_PASS, // Your app password or account password
    },
});

// Function to send a reset password email
async function sendResetEmail(email, token) {
    const resetUrl = `https://file-chat-client.vercel.app/reset-password/${token}`; // Replace with your frontend URL
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Reset email sent successfully');
    } catch (error) {
        console.error('Error sending reset email:', error);
        throw error; // Handle this in your controller
    }
}

module.exports = { sendResetEmail };

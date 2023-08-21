const mssql = require('mssql');

const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv=require('dotenv')
dotenv.config()
const { sqlConfig } = require('../Config/config');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port:587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD,
  }
});

// Generate a unique reset token
function generateUniqueToken() {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

async function saveResetTokenToDatabase(userEmail, resetToken, expiration) {
  const pool = await mssql.connect(sqlConfig);
  await pool.request()
    .input('userEmail', mssql.NVarChar(255), userEmail)
    .input('resetToken', mssql.NVarChar(255), resetToken)
    .input('expiration', mssql.DateTime, new Date(expiration))
    .execute('createResetToken');
}

async function updatePasswordInDatabase(userEmail, newPassword) {
  const pool = await mssql.connect(sqlConfig);
  await pool.request()
    .input('userEmail', mssql.NVarChar(255), userEmail)
    .input('newPassword', mssql.NVarChar(255), newPassword)
    .execute('updatePassword');
}

async function deleteTokenFromDatabase(resetToken) {
  const pool = await mssql.connect(sqlConfig);
  await pool.request()
    .input('resetToken', mssql.NVarChar(255), resetToken)
    .execute('deleteResetToken');
}

async function getTokenInfoFromDatabase(resetToken) {
  const pool = await mssql.connect(sqlConfig);
  const result = await pool.request()
    .input('resetToken', mssql.NVarChar(255), resetToken)
    .query('EXEC getTokenInfo @resetToken');
  
  if (result.recordset.length > 0) {
    return result.recordset[0];
  }
  
  return null;
}

async function sendResetEmail(userEmail, resetLink) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Password Reset',
    text: `Here is your password reset link: ${resetLink}. Use it within one hour.`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}




module.exports = {
  saveResetTokenToDatabase,
  updatePasswordInDatabase,
  deleteTokenFromDatabase,
  getTokenInfoFromDatabase,
  generateUniqueToken,
  sendResetEmail
};

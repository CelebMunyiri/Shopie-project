const Router=require('express');
const { deleteTokenFromDatabase, updatePasswordInDatabase, getTokenInfoFromDatabase, sendResetEmail, saveResetTokenToDatabase, generateUniqueToken } = require('../Contoller/resetPasswordController');
const resetRoute=Router()


resetRoute.post('/reset-password', async (req, res) => {
  const { userEmail } = req.body;

  // Generate a unique reset token (You can use libraries like 'crypto' to generate tokens)
  const resetToken = generateUniqueToken();

  // Save the token and its expiration in the database (you'll need a 'resetTokens' table)
  await saveResetTokenToDatabase(userEmail, resetToken, Date.now() + 3600000); // Expire after 1 hour

  // Send an email to the user containing the reset link
  const resetLink = `${resetToken}`;
  sendResetEmail(userEmail, resetLink);

  res.send('Password reset email sent.');
});

resetRoute.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    // Verify the token and its expiration
    const tokenInfo = await getTokenInfoFromDatabase(token);
    if (!tokenInfo || tokenInfo.expiration < Date.now()) {
      return res.status(400).send('Invalid or expired token.');
    }
  
    // Update the user's password in the database
    const userEmail = tokenInfo.userEmail;
    await updatePasswordInDatabase(userEmail, newPassword);
  
    // Remove the used token from the database
    await deleteTokenFromDatabase(token);
  
    res.send('Password updated successfully.');
  });

  
  module.exports={
    resetRoute
  }
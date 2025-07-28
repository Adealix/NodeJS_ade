const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const sendEmail = require('../utils/sendEmail');

const { isAuthenticatedUser, isAdmin } = require('../middlewares/auth');

const { registerUser, 
    loginUser, 
    updateUser, 
    deactivateUser, 
    // getCustomerByEmail, 
    getCustomerByUserId, 
    deleteUserAndCustomer, 
    getAllUsersWithCustomers,
    updateUserStatusRole,
    logoutUser,
    verifyEmail,
    resendVerificationEmail } = require('../controllers/user')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/verify-email', verifyEmail)
router.post('/resend-verification', resendVerificationEmail)
// Only authenticated users can update their profile
router.post('/update-profile', isAuthenticatedUser, upload.single('image'), updateUser)
// Only admin can deactivate users and delete users
router.delete('/deactivate', isAuthenticatedUser, isAdmin, deactivateUser)
router.delete('/delete-user/:user_id', isAuthenticatedUser, isAdmin, deleteUserAndCustomer)
// Admin-only: get all users/customers for DataTable
router.get('/customers', isAuthenticatedUser, isAdmin, getAllUsersWithCustomers);
// Admin-only: update status and role for a user
router.put('/customers/:userId/status-role', isAuthenticatedUser, isAdmin, updateUserStatusRole);
// If you want to support methodOverride via POST:
router.post('/customers/:userId/status-role', isAuthenticatedUser, isAdmin, updateUserStatusRole);
router.get('/customer-by-userid/:user_id', isAuthenticatedUser, getCustomerByUserId);
router.post('/logout', isAuthenticatedUser, logoutUser);

router.post('/test-email', async (req, res) => {
  try {
    await sendEmail({
      email: req.body.email, // or hardcode for testing
      subject: req.body.subject || 'Test Email',
      message: req.body.message || 'This is a test email from your Node.js app.'
    });
    res.status(200).json({ success: true, message: 'Test email sent!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router


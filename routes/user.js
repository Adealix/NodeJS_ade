const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const { isAuthenticatedUser, isAdmin } = require('../middlewares/auth');

const { registerUser, loginUser, updateUser, deactivateUser, getCustomerByEmail, getCustomerByUserId, deleteUserAndCustomer } = require('../controllers/user')

router.post('/register', registerUser)
router.post('/login', loginUser)
// Only authenticated users can update their profile
router.post('/update-profile', isAuthenticatedUser, upload.single('image'), updateUser)
// Only admin can deactivate users and delete users
router.delete('/deactivate', isAuthenticatedUser, isAdmin, deactivateUser)
router.delete('/delete-user/:user_id', isAuthenticatedUser, isAdmin, deleteUserAndCustomer)
// Only admin can get all users (if you add such a route)
// router.get('/all', isAuthenticatedUser, isAdmin, getAllUsers)
// Customer info endpoints (could be user or admin)
router.get('/customer-by-email', isAuthenticatedUser, getCustomerByEmail);
router.get('/customer-by-userid/:user_id', isAuthenticatedUser, getCustomerByUserId);
module.exports = router


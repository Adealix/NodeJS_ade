const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const { isAuthenticatedUser, isAdmin } = require('../middlewares/auth');

const { registerUser, 
    loginUser, 
    updateUser, 
    deactivateUser, 
    // getCustomerByEmail, 
    getCustomerByUserId, 
    deleteUserAndCustomer, 
    getAllUsersWithCustomers,
    updateUserStatusRole } = require('../controllers/user')

router.post('/register', registerUser)
router.post('/login', loginUser)
// Only authenticated users can update their profile
router.post('/update-profile', isAuthenticatedUser, upload.single('image'), updateUser)
// Only admin can deactivate users and delete users
router.delete('/deactivate', isAuthenticatedUser, isAdmin, deactivateUser)
router.delete('/delete-user/:user_id', isAuthenticatedUser, isAdmin, deleteUserAndCustomer)
// Admin-only: get all users/customers for DataTable
router.get('/customers', isAuthenticatedUser, isAdmin, getAllUsersWithCustomers);
// Admin-only: update status and role for a user
router.put('/customers/:userId/status-role', isAuthenticatedUser, isAdmin, updateUserStatusRole);
// Customer info endpoints (could be user or admin)
// router.get('/customer-by-email', isAuthenticatedUser, getCustomerByEmail);
router.get('/customer-by-userid/:user_id', isAuthenticatedUser, getCustomerByUserId);
module.exports = router


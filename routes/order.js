const express = require('express');

const router = express.Router();

const {createOrder, getUserOrdersWithItems} = require('../controllers/order')
const {isAuthenticatedUser} = require('../middlewares/auth')

router.post('/create-order', isAuthenticatedUser, createOrder)
router.get('/orders/user/:userId', isAuthenticatedUser, getUserOrdersWithItems);

module.exports = router;
const express = require('express');
const { registerAdmin, loginAdmin, fetchOrders, fetchOrderById, fetchUserOrders, updateOrderStatus } = require('../controllers/adminController');
const { protectAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// Register Route
router.post('/register', registerAdmin);

// Login Route
router.post('/login', loginAdmin);

// Order Routes
router.get('/getOrders', protectAdmin, fetchOrders);
router.get('/getOrders/:id', protectAdmin, fetchOrderById);

router.post('/updateOrder', protectAdmin, updateOrderStatus);

module.exports = router;

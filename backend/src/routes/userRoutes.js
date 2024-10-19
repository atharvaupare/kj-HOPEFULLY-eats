const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  placeOrder,
  retrieveOrder
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware"); // Import the token middleware
const router = express.Router();

// Protected route to get user profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.post("/order", protect, placeOrder)

router.get('/order/:orderToken', protect, retrieveOrder);

module.exports = router;

const express = require("express");
const multer = require('multer');
const {
  getUserProfile,
  updateUserProfile,
  placeOrder,
  retrieveOrder
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware"); // Import the token middleware
const router = express.Router();

const upload = multer({
  limits: {
      fileSize: 1000000
  },
  fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|webp)/)) {
          return cb(new Error("Please upload an image"))
      }

      cb(undefined, true)
  }
})

// Protected route to get user profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, upload.single('file'), updateUserProfile);

router.post("/order", protect, placeOrder)

router.get('/order/:orderToken', protect, retrieveOrder);

module.exports = router;

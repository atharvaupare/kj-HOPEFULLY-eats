const User = require("../models/userModel");

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    // Find the user by idNumber from token
    const user = await User.findOne({ idNumber: req.user.idNumber }).select(
      "-password"
    ); // Exclude password field

    if (user) {
      res.status(200).json({
        status: "success",
        message: "User profile retrieved successfully",
        data: user,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Server error while retrieving user profile",
    });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    // Find the user by idNumber from token
    const user = await User.findOne({ idNumber: req.user.idNumber });

    if (user) {
      user.email = user.email; // Email cannot be updated
      user.mobileNo = req.body.mobileNo || user.mobileNo;

      const updatedUser = await user.save();

      res.status(200).json({
        status: "success",
        message: "User profile updated successfully",
        data: updatedUser,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Server error while updating user profile",
    });
  }
};

module.exports = { getUserProfile, updateUserProfile };

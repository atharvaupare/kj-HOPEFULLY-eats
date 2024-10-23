const User = require("../models/userModel");
const Order = require("../models/orderModel");
const sharp = require('sharp');
const bcrypt = require('bcryptjs');

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    // Find the user by email from token
    const user = await User.findOne({ email: req.user.email }).select(
      "-password"
    );

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
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 8);
      user.password = hashedPassword;
    }

    if (req.file) {
      try {
        const buffer = await sharp(req.file.buffer)
          .resize({ width: 250, height: 250 })
          .png()
          .toBuffer();
        user.avatar = buffer;
      } catch (error) {
        console.error('Error processing image:', error);
        return res.status(400).json({
          status: "fail",
          message: "Error processing image file"
        });
      }
    }

    await user.save();

    // Send success response
    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({
      status: "fail",
      message: error.message || "Server error while updating user profile"
    });
  }
};
const placeOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount, estimatedTime } = req.body; // Add estimatedTime

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Cart items are required",
      });
    }

    const { nanoid } = await import('nanoid');
    const orderToken = nanoid(10);

    const order = new Order({
      user: req.user._id,
      cartItems,
      totalAmount,
      estimatedTime,
      orderToken
    });

    const createdOrder = await order.save();

    const user = await User.findById(req.user._id);
    if (user) {
      user.orders.push(orderToken);
      await user.save();
    }

    res.status(201).json({
      status: "success",
      message: "Order placed successfully",
      data: createdOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      status: "fail",
      message: "Error placing order",
    });
  }
};


const retrieveOrder = async (req, res) => {
  try {
    const { orderToken } = req.params;

    const order = await Order.findOne({ orderToken });

    if (order) {
      if (order.user.toString() === req.user._id.toString()) {
        res.status(200).json({
          status: "success",
          message: "Order retrieved successfully",
          data: order,
        });
      } else {
        res.status(403).json({
          status: "fail",
          message: "You are not authorized to view this order",
        });
      }
    } else {
      res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({
      status: "fail",
      message: "Server error while retrieving order",
    });
  }
};


module.exports = { getUserProfile, updateUserProfile, placeOrder, retrieveOrder };

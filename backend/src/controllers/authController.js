const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (idNumber, email) => {
  return jwt.sign({ idNumber, email }, process.env.JWT_SECRET);
};

// Register user
const registerUser = async (req, res) => {
  const { idNumber, email, password, mobileNo } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ status: "fail", message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({
      idNumber,
      email,
      password,
      mobileNo,
    });

    // Generate token
    const token = generateToken(user.idNumber, user.email);

    // Send response
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Error registering user" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user.idNumber, user.email);
      res.status(200).json({
        status: "success",
        message: "Login successful",
        token,
      });
    } else {
      res
        .status(401)
        .json({ status: "fail", message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Error logging in user" });
  }
};

module.exports = { registerUser, loginUser };

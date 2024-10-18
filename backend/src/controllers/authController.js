const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = async (user) => {
  try {
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Add token to user's tokens array
    user.tokens = user.tokens.concat({ token });
    await user.save();
    
    return token;
  } catch (error) {
    throw new Error('Error generating token: ' + error.message);
  }
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("Register User Request Body:", req.body);

    // Check if the user already exists by email
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ status: "fail", message: "User already exists" });
    }

    // Create a new user
    const user = new User({
      name,
      email,
      password,
    });

    // Save user to the database
    await user.save();

    // Generate token
    const token = await generateToken(user);

    // Send response
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error Registering User:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "fail",
        message: "Invalid input data",
        errors: error.errors,
      });
    }

    // Handle other possible errors
    res.status(500).json({ status: "fail", message: "Error registering user" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      // Generate token
      const token = await generateToken(user);
      
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
    console.error("Error Logging In User:", error);
    res.status(500).json({ status: "fail", message: "Error logging in user" });
  }
};

module.exports = { registerUser, loginUser };

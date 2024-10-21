const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config(); // Load environment variables

// Connect to MongoDB
connectDB();

// Initialize the Express app
const app = express();
app.use(express.urlencoded({ extended: true })); // Add this line

// Middleware to parse JSON and handle CORS
app.use(cors());
app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/admin", adminRoutes)

// Health Check Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global error handler (optional but useful)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred.",
    error: err.message,
  });
});

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Export the app to be used in server.js
module.exports = app;

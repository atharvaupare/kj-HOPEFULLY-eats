const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    idNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "ID must be a 10-digit number"], // Ensures ID is exactly 12 digits
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    mobileNo: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash the password before saving it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Pass control to the next middleware or save function
  } catch (error) {
    next(error); // Pass the error to the next middleware or error handler
  }
});

// Compare entered password with hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

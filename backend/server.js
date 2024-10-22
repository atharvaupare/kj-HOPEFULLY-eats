const dotenv = require("dotenv");
const { server } = require("./src/app");
const connectDB = require("./src/config/db");
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

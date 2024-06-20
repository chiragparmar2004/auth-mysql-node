// Import required modules
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

// Load environment variables from .env file
dotenv.config();

// Create an instance of express
const app = express();

// Set the port from environment variables
const PORT = process.env.PORT || 5000;

// Use CORS middleware for enabling Cross-Origin Resource Sharing
app.use(cors());

// Use express.json() middleware to parse JSON requests
app.use(express.json());

// Use express.urlencoded() middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

connectDB();
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

export default app;

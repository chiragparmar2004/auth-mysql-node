// Import necessary modules
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userSchema from "../schema/userSchema.js"; // Assuming userSchema.js exports the user schema
import {
  createTable,
  checkRecordExists,
  insertRecord,
} from "../utils/sqlFunctions.js"; // Assuming sqlFunctions.js exports database functions

// Function to generate JWT access token
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Controller function to handle user registration
const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required fields." });
  }

  try {
    // Generate userId using uuidv4
    const userId = uuidv4();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a user object
    const user = {
      userId,
      username,
      email,
      password: hashedPassword,
    };

    // Ensure the users table exists in the database
    await createTable(userSchema);

    // Check if user with same email already exists
    const userAlreadyExists = await checkRecordExists("users", "email", email);

    if (userAlreadyExists) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Insert the new user record into the database
    await insertRecord("users", user);

    // Respond with success message
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to handle user login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }

  try {
    // Check if user with provided email exists in the database
    const existingUser = await checkRecordExists("users", "email", email);

    if (existingUser) {
      // Validate password
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        // Generate and return JWT access token if password matches
        const token = generateAccessToken(existingUser.userId);
        res.status(200).json({
          userId: existingUser.userId,
          username: existingUser.username,
          email: existingUser.email,
          access_token: token,
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export controller functions
export { register, login, generateAccessToken };

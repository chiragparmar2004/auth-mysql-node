import { checkRecordExists } from "../utils/sqlFunctions.js"; // Assuming sqlFunctions.js exports database functions

// Controller function to fetch user profile
const getProfile = async (req, res) => {
  const userId = req.userId; // Extract userId from authenticated request

  try {
    // Fetch user profile information based on userId
    const user = await checkRecordExists("users", "userId", userId);

    if (user) {
      // Return user profile information
      res.status(200).json({
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getProfile };

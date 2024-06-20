// Import dotenv to load environment variables
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define the database configuration object using environment variables
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Export the configuration object
export default dbConfig;

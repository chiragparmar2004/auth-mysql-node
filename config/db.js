// Import mysql to create a connection pool
import mysql from "mysql2/promise"; // Use the promise-based version of mysql
import dbConfig from "./config.js"; // Import database configuration

// Function to connect to the MySQL database
const connectDB = async () => {
  try {
    // Create a connection pool with the provided configuration
    const pool = mysql.createPool(dbConfig);

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Log a success message
    console.log("Connected to MySQL database");

    // Release the connection back to the pool
    connection.release();

    // Return the pool for use elsewhere in the application
    return pool;
  } catch (err) {
    // Log any errors that occur during the connection attempt
    console.error("Error connecting to MySQL database:", err.message);
  }
};

// Export the connectDB function
export default connectDB;

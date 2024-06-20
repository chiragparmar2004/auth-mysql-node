// Import mysql to create a connection pool
import mysql from "mysql2/promise";
import dbConfig from "../config/config.js";

// Create a connection pool with the provided configuration
const pool = mysql.createPool(dbConfig);

// Function to create a table using the provided schema
export const createTable = async (schema) => {
  try {
    const [results] = await pool.query(schema);
    return results;
  } catch (error) {
    throw new Error(`Error creating table: ${error.message}`);
  }
};

// Function to check if a record exists in a table
export const checkRecordExists = async (tableName, column, value) => {
  try {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    const [results] = await pool.query(query, [value]);
    return results.length ? results[0] : null;
  } catch (error) {
    throw new Error(`Error checking record existence: ${error.message}`);
  }
};

// Function to insert a record into a table
export const insertRecord = async (tableName, record) => {
  try {
    const query = `INSERT INTO ${tableName} SET ?`;
    const [results] = await pool.query(query, record);
    return results;
  } catch (error) {
    throw new Error(`Error inserting record: ${error.message}`);
  }
};

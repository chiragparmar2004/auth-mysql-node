// Define the user table schema
const userSchema = `
CREATE TABLE IF NOT EXISTS users (
  userId VARCHAR(255) PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
`;

// Export the schema
export default userSchema;

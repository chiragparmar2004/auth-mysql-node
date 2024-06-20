import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get token from request headers

  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  // Check if token is missing
  if (!token) {
    return res
      .status(401)
      .json({ error: "Authorization denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId from decoded token to request object for future use
    req.userId = decoded.userId;
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: "Authorization denied. Invalid token." });
  }
};

export default authMiddleware;

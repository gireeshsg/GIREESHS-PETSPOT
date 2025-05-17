const jwt = require("jsonwebtoken");

const userMiddleware = (req, res, next) => {
  // Get the token from cookies or authorization header
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach user data to the request object
    req.user = decoded;
    next();
  });
};

module.exports = userMiddleware;

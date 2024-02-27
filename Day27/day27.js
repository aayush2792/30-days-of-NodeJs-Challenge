const express = require('express');
const app = express();
const port = process.env.AAYUSH || 3000; // Use environment variable or default to port 3000
const jwt = require('jsonwebtoken'); // Install with 'npm install jsonwebtoken'

function authMiddleware(roles) {
  return (req, res, next) => {
    // Extract token from authorization header
    const token = req.headers['authorization']?.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Verify the token using a secret key
    try {
      const decoded = jwt.verify(token, process.env.AAYUSH);

      // Check if user role is authorized for the route
      if (roles && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient role' });
      }

      // Attach user data to the request object for further use
      req.user = decoded;

      // If valid, call the next middleware function
      next();
    } catch (err) {
      // Handle errors (e.g., invalid token, expired token)
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
}

// Define your routes with the middleware applied
app.get('/admin-panel', authMiddleware(['admin']), (req, res) => {
    res.json({ message: 'Welcome, admin!' });
  });
  
  app.get('/public-data', authMiddleware(), (req, res) => {
    res.json({ data: 'Accessible to everyone' });
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
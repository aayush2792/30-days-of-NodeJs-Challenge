const express = require('express');
const app = express(); // Create an instance of Express

// Define your middleware function
function requestLoggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  console.log(`${timestamp} - ${method} request received.`);
  next();
}

// Apply the middleware to all incoming requests
app.use(requestLoggerMiddleware);

// Define route handler for the root endpoint
app.get('/', (req, res) => {
  res.send('Hello, I am aayush this is my 7th day on NodeJs ');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
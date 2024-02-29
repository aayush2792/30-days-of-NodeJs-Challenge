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
  // Intentionally throw an error
 throw new Error('Intentional error for testing');
 // This line will not be reached due to the error
 res.send('Hello, I am Aayush this is my 29th day on NodeJs. Hehhe ');
});

// Middleware function for error handling
function errorHandler(err, req, res, next) {
    // Log the error for debugging
    console.error(err.stack);

    // Check for specific error types
    if (err.message === 'Intentional error for testing') {
        // Send a custom error page 
        res.status(404).sendFile(__dirname + '/error.html');
    } else {
        // Send a generic error response
        res.status(500).json({
            message: 'Internal Server Error',
            error: err.message
        });
    }
}

// Register the error handling middleware
app.use(errorHandler);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
const express = require('express');
const app = express();

/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

function greetHandler(req, res) {
  const name = req.query.name;
  const greeting = name ? `Hello, ${name}!` : "Hello, Guest!";
  res.send(greeting);
}

app.get('/greet', greetHandler);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
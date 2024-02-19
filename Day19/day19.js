const mongoose = require('mongoose');
const validator = require('validator');

// Define User schema with email validation
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Invalid email format',
    },
  },
});

// Create User model
const User = mongoose.model('User', userSchema);
// Function to add user with validation
async function addUserWithValidation(user) {
  const newUser = new User(user); // Create new user instance
  try {
    await newUser.save(); // Attempt to save the user
    console.log('User added successfully:', newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Validation error:', error.message);
    } else {
      console.error('Error adding user:', error);
    }
  }
}
// Example usage
addUserWithValidation({ username: 'john_doe', email: 'invalid-email' }); // Should give validation error
addUserWithValidation({ username: 'Aayush', email: 'aayush@example.com' }); // Should add user successfully
// Connect to MongoDB before using addUserWithValidation
mongoose.connect('mongodb://localhost:27017/myDatabase')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
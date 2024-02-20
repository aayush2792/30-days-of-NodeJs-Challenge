const express = require('express');
const app = express();
const mongoose = require('mongoose');
const validator = require('validator');

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
  age: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);

async function addUserToDatabase(user) {
  const newUser = new User(user); 

  try {
    await newUser.save(); 
    console.log('User added successfully:', newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.error('Validation error:', error.message);
    } else {
      console.error('Error adding user:', error);
    }
  }
}

async function averageAgeOfUsers(req, res) {
  const users = await User.find();
  var x = 0;
  users.map((user) => {
    if (isNaN(user.age)) {
      x += 0;
    } else {
      x += user.age;
    }
  });
  var y = x / users.length;
  res.json(JSON.stringify(y));
}

app.get('/login', (req, res) => {
  addUserToDatabase({ username: 'Span', email: 'Span@example.com', age: 23 });
});

app.get('/average-age', (req, res) => {
  averageAgeOfUsers(req, res);
});

app.get('/', (req, res) => {
  res.send({ message: "You are at the home page" });
});

mongoose.connect('mongodb://localhost/myDatabase')
.then(() => {
  console.log('MongoDB connected');
  app.listen(3000, () => console.log("Listening at port 3000"));
})
.catch(err => console.error('MongoDB connection error:', err));

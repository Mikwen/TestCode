const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// User Schema
const UserSchema = mongoose.Schema({
  username: { type: String, index: true },
  password: { type: String },
  email: { type: String },
  name: { type: String },
  courses_attending: { type: [String] },
  courses_administrating: { type: [String] }
});


// Variable that is accessable outside this file (mongoose)
const User = mongoose.model('User', UserSchema);
module.exports = User;
// Function to create user
// Takes in new user and a callback function
// Uses bcrypt to hash password
module.exports.createUser = (newUser, callback) => bcrypt
.genSalt(10, (err, salt) => bcrypt
.hash(newUser.password, salt, (err, hash) => {
  newUser.password = hash;
  newUser.save(callback);
}));

// Function to see if the username brought in matches
// an already established user
module.exports.getUserByUsername = (username, callback) => {
  const query = { username };
  User.findOne(query, callback);
};

// Function to see if the userid brought in matches
// and already established user id.
module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

// Function to see if the password brought in matches the
// password for the eastablished user.
// uses bcrypt because of the hashing
module.exports.comparePassword = (candidatePassword, hash, callback) => bcrypt
.compare(candidatePassword, hash, (err, isMatch) => (!err ?
callback(null, isMatch) : err));


// Function to add courses the user is attending in an array
// TODO: Remove duplicates and null.
module.exports.addCourseAttending = (userId, courseId, callback) => User
.getUserByUsername(userId, (err, user) => {
  let found = false;
  for (const course in user.courses_attending) {
    if (course === courseId) {
      found = true;
    }
  }
  // if (user.courses_attending == undefined){
  // user.courses_attending = [];
  // }
  if (!found) {
    user.courses_attending.push(courseId);
    user.save(callback);
  }
});

// Search through the database for courses based on the username
module.exports.getCoursesByUsername = (userId, callback) => {
  User.getUserByUsername(userId, (err, user) => {
    callback(user.courses_attending);
  });
};

// Find courses where you are admin.
module.exports.getCoursesByUsername = (userId, callback) => {
  User.getUserByUsername(userId, (err, user) => {
    callback(user.courses_administrating);
  });
};

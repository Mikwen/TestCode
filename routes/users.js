const express = require('express');
const utils = require('../controllers/middlewares/utils');
const users = require('../controllers/user');

const router = express.Router();

// Register route
router.get('/register', users.register);

// Login route
router.get('/login', users.login);


// Register User
router.post('/register', users.create);

// decides what happens on failure and success + whether or not to use flashmsg
// redirects using local strategy
router.post('/login', utils.authenticate, users.home);

// Lets a user log out of the application.
// Gives success msg when logged out.
// Redirects to the login page.
router.get('/logout', users.logout);

// Route for the courses the user is attending, then redirects to dashboard/home
router.put('/user_courses', users.addCourse);

router.get('/user_courses', users.getCoursesByUsername);

// Route for the courses the user is administrating,
// then redirects to dashboard/home
router.put('/user_courses_admin', users.addCourseAdministrating);

// GET request to the courses the user is administrating
router.get('/user_courses_admin', users.getCoursesByUsername);

module.exports = router;

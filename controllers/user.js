const User = require('../models/user');

const users = {
  register(req, res) {
    return res.status(200).render('register');
  },
  login(req, res) {
    if (req.headers['user-agent'].indexOf('Mozilla') === -1) {
      return res.status(200).json({ status: 200 });
    }
    return res.status(200).render('login');
  },
  home(req, res) {
    return res.status(302).redirect('/');
  },
  logout(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    return res.status(302).redirect('/users/login');
  },
  create(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match')
    .equals(req.body.password);

    const errors = req.validationErrors();

    // If there is an error it displays error and then re-renders the page
    if (errors) {
      return res.status(401).render('register', { errors });
    }
    const newUser = new User({ name, email, username, password });

    // takes in new user and callback
    // checks for an error
    User.createUser(newUser, (err, user) => (!err ? user : err));

    // Gives success msg and redirects to login screen
    req.flash('success_msg', 'You are registered and can now login');
    res.status(302).redirect('/users/login');
  },
  addCourse(req, res) {
    return User.addCourseAttending(req.body.userId, req.body.courseId, () => res.status(200)
    .redirect('/'));
  },
  getCoursesByUsername(req, res) {
    return User.getCoursesByUsername(req.body.userId, coursesAttending => res.status(200)
    .send(coursesAttending));
  },
  addCourseAdministrating(req, res) {
    return User
    .addCourseAdministrating(req.body.userId, req.body.courseId, () => res.status(200)
    .redirect('/'));
  }
};

module.exports = users;

const fs = require('fs');
const passport = require('../middlewares/passport');

const fileLink = (course, file) => (`<li class="w3-hover-teal"><a href="#" onclick="showFile('files/${course}/${file}')"><h3>${file}</h3></a></li>`);

const makeFileButtonString = (course, callback) => fs
.readdir(`public/files/${course}`, (err, items) => {
  let returnstring = '';
  for (const i in items) {
    if (items) returnstring += `${fileLink(course, items[i])}\n`;
  }
  return callback(returnstring);
});

const courseLink = course => (`<li class="w3-hover-teal"><a href="course?course=${course}"><h3>${course}</h3></a></li>`);

const authenticate = passport
.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
});

const ensureAuthenticated = (req, res, next) => (req.isAuthenticated() ?
next() : res.redirect('/users/login'));

const utils = {
  makeFileButtonString,
  courseLink,
  fileLink,
  authenticate,
  ensureAuthenticated
};

module.exports = utils;

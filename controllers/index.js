const Handlebars = require('handlebars');
const utils = require('./middlewares/utils');

const index = (req, res) => res.render('index', {
  username: req.user.name,
  helpers: {
    courseButtons() {
      let returnstring = '';
      const courses = ['TDT4150', 'TDT4314', 'TDT3513', 'TDT4355'];
      for (const i in courses) {
        if (courses) returnstring += `${utils.courseLink(courses[i])}\n`;
      }
      return new Handlebars.SafeString(returnstring);
    }
  }
});

module.exports = index;


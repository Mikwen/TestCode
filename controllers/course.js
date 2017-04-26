const Handlebars = require('handlebars');
const utils = require('./middlewares/utils');

const course = {
  page(req, res) {
    return utils.makeFileButtonString(req.query.course, (returnstring) => {
      const fileButtonString = new Handlebars.SafeString(returnstring);
      return res.render('course', {
        course: req.query.course,
        courseAdmin: true,
        fileButtons: fileButtonString
      });
    });
  }
};

module.exports = course;

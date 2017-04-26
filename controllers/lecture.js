const Lecture = require('../models/lecture');

const lecture = {
  create(req, res) {
    const subject = req.body.subject;
    const roomNr = req.body.roomNr;
    const date = req.body.date;
    const time = req.body.time;

    // Makes sure fields are not empty (Validation)
    req.checkBody('subject', 'Subject is required').notEmpty();
    req.checkBody('roomNr', 'Room number is required').notEmpty();
    req.checkBody('date', 'Date is required').notEmpty();
    req.checkBody('time', 'Time is required').notEmpty();

    const errors = req.validationErrors();

    // If there is an error it displays error and then re-renders the page
    if (errors) {
      return res.render('lecture', { errors });
    }
    const newLecture = new Lecture({ subject, roomNr, date, time });
    // takes in new lecture and callback
    // checks for an error
    Lecture.createLecture(newLecture, (err, lecture) => (err ? lecture : err));
    // Gives success msg and redirects to dashboard
    req.flash('success_msg', 'You have successfully added a lecture!');
    res.redirect('/');
  },

  getLecture(req, res) {
    return Lecture
    .getLectureBySubjectAndMonth(
      req.body.subject, req.body.month,
      lectures => res.send(lectures));
  }
};

module.exports = lecture;


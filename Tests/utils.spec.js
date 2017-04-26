const should = require('./helper').should;
const utils = require('../controllers/middlewares/utils');

describe('Utils: ', () => {
  describe('courseLink: ', () => {
    it('should return a course link', () => {
      const link = utils.courseLink('test101');
      link.should.equal(`<li class="w3-hover-teal"><a href="course?course=test101"><h3>test101</h3></a></li>`);
    });
  });

  describe('fileLink: ', () => {
    it('should return a file link', () => {
      const link = utils.fileLink('test101', 'file.js');
      link.should.equal(`<li class="w3-hover-teal"><a href="#" onclick="showFile('files/test101/file.js')"><h3>file.js</h3></a></li>`);
    });
  });
});

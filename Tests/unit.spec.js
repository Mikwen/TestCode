const helper = require('./helper');

const app = helper.app;

describe('App: ', () => {
  describe('Login: ', () => {
    it('should open the login page', (done) => {
      app.get('/users/login')
      .end((error, response) => {
        response.status.should.equal(200);
        done();
      });
    });
  });

  describe('Logout: ', () => {
    it('should logout a user', (done) => {
      app.get('/users/logout')
      .end((error, response) => {
        response.status.should.equal(302);
        done();
      });
    });
  });

  describe('Register: ', () => {
    it('should open the registration page', (done) => {
      app.get('/users/register')
      .end((error, response) => {
        response.status.should.equal(200);
        done();
      });
    });
  });

  describe('Register: ', () => {
    it('should not register an unauthenticated user', (done) => {
      app.post('/users/register')
      .end((error, response) => {
        response.status.should.equal(401);
        done();
      });
    });
  });

  describe('Home: ', () => {
    it('should open the homepage', (done) => {
      app.get('/')
      .end((error, response) => {
        response.status.should.equal(302);
        done();
      });
    });
  });

 
});

const request = require('supertest');
const expect = require('expect');

var app = require('../server').app;

describe('Server', () => {
  describe('GET /bad', () => {
    it('should return bad request response', (done) => {
      request(app)
        .get('/bad')
        .expect(200)
        .expect((res) => {
          expect(res.body).toInclude({
            errorMessage: 'Bad request'
          });
        })
        .end(done);
    });
  });

  describe('GET /', () => {
    it('should return response', (done) => {
      request(app)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatch(/Welcome to my website./);
      })
      .end(done);
    });
  });
});
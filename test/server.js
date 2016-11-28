const request = require('supertest');
const expect = require('expect');

var app = require('../server').app;

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

it('should return response', (done) => {
  request(app)
  .get('/')
  .expect(200)
  .expect((res) => {
    expect(res.body).toMatch(/Welcome to my website./);
  })
  .end(done);
});
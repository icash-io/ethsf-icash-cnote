'use strict';

import app from '../..';
import User from './user.model';
import request from 'supertest';

describe('User API:', function() {
  var user;

  // Clear users before testing
  before(function() {
    return User.remove().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@androgeniq.com',
        password: 'password',
        verificationCode: 123123,
        verificationHash: 'asdf123',
        hasVerified: true
      });

      return user.save();
    });
  });

  // Clear users after testing
  after(function() {
    return User.remove();
  });



  describe('GET: /api/users/me', function() {
    var token;
    var currUser;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@androgeniq.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.body._id.toString().should.equal(user._id.toString());
          currUser = res.body;
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });

    //MOST IMPORTANT TODO
    xit("should not resend email you anymore if you're already verified", function(done){
      request(app)
        .put('/api/users/' + currUser._id + '/verification-code')
        .send({})
        .set('authorization', 'Bearer ' + token)
        .expect(410)
        .end(function (err,res){
          if (err) done(err);
          done();
        })
    })

    it("should not verify you anymore, if you've already been",function (done){
      request(app)
        .post('/auth/local/verification')
        .send({
          user: currUser,
          code: 123123
        })
        .set('authorization','Bearer ' + token)
        .expect(410)
        .end(done)
    })

    it("should not send a 404, if the user doesn't match the token",function (done){
      request(app)
        .post('/auth/local/verification')
        .send({
          user: {
            _id: (new User())._id
          },
          code: 123123
        })
        .set('authorization','Bearer ' + token)
        .expect(404)
        .end(done)
    })
  });

  

  describe('PUT: /:id/password',function (){
    var token;
    var currUser;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@androgeniq.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.body._id.toString().should.equal(user._id.toString());
          currUser = res.body;
          done();
        });
    });

    it('should not err when req.body.code is undefined', function(done) {
      request(app)
        .put('/api/users/'+currUser._id+'/password')
        .send({
          "_id": currUser._id,
          "strategy": 'currentPassword',
          "oldPassword": "password",
          "newPassword": "starcraft"
        })
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.eql({})
          done();
        });
    });

    it('should show that the password has changed',function (done){
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@androgeniq.com',
          password: 'starcraft'
        })
        .expect(200)
        .expect('Content-Type',/json/)
        .end((err,res)=>{
          token = res.body.token;
          done();
        })
    })
  })

  //TODO: need some way to pass session or else this is unsafe
  describe('PUT: /:id/overwrite-password',function (){

  })


});

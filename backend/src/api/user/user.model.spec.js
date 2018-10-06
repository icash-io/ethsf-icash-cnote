'use strict';

import app from '../..';
import User from './user.model';
var user;
var genUser = function() {
  user = new User({
    provider: 'local',
    name: 'Fake User',
    email: 'test@keystonestrategy.com',
    password: 'password',
    verificationCode: 123123,
    verificationHash: 'asdfa2143'
  });
  return user;
};

describe('User Model', function() {
  before(function() {
    // Clear users before testing
    return User.remove();
  });

  beforeEach(function() {
    genUser();
  });

  afterEach(function() {
    return User.remove();
  });

  it('should begin with no users', function() {
    return User.find({}).exec().should
      .eventually.have.length(0);
  });

  it('should fail when saving a duplicate user', function() {
    return user.save()
      .then(function() {
        var userDup = genUser();
        return userDup.save()
      }).should.be.rejected;
  });

  describe('#email', function() {
    it('should fail when saving without an email', function() {
      user.email = '';
      return user.save().should.be.rejected;
    });
  });

  describe('#password', function() {
    beforeEach(function() {
      return user.save();
    });
    var fieldName = 'password'
    it('should authenticate user if valid', function() {
      user.decryptify(fieldName,'password').should.be.true;
    });

    it('should not authenticate user if invalid', function() {
      user.decryptify(fieldName,'blah').should.not.be.true;
    });

    it('should remain the same hash unless the password is updated', function() {
      user.name = 'Test User';
      return user.save()
        .then(function(u) {
          return u.decryptify(fieldName,'password');
        }).should.eventually.be.true;
    });
  });

});

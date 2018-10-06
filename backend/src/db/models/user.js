'use strict';

import {user as USER_CONFIG} from '../../config/environment/shared';
import crypto from 'crypto';
import { error } from 'util';

const ROLE_TYPES = ['admin', 'user'];

// Utility Functions
function createIntCode() {
  return Math.ceil(Math.random() * 999999);
}

function createAlphaNumericCode(length) {
  return Math.random().toString(36).substr(2, length)
}

function makeSalt(byteSize = 16) {
  return crypto.randomBytes(byteSize).toString('base64');
}

function validatePresenceOf(value) {
  return value && value.length;
}

module.exports = (sequelize, DataTypes) => {

  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ethAddress: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    contributionAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    kycVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    kycPending: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    kycAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    accessToken: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(ROLE_TYPES),
      allowNull: false,
    },
  },
  {
    classMethods: {
      associate: function(models) {
        this.hasMany(models.KycDocument);
      },
      createRecord: async function(obj, role='user') {
        const user = this.build(obj);

        if (role === 'user') {
          user.accessToken = createAlphaNumericCode(10);
        }
        user.kycVerified = false;
        user.role = role;
        user.kycAttempts = 0;
        
        return await user.save();
      },
    },
    instanceMethods: {
      /* NO PASSWORD LOGIN - Encryptify not used */
      /**
       * Authenticate - check if the passwords are the same
       *
       * @param {String} password
       * @param {Function} callback
       * @return {Boolean}
       * @api public
       */
      authenticate: function(password, callback) {
        if (!callback) {
          return this.password === password;
        }

        if (this.password === password) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },

      /**
       * resetAccessToken - Resets accessToken if email lost
       */
      resetAccessToken: async function() {
        this.accessToken = createAlphaNumericCode(10);
        return await this.save();
      },

      /**
       * For combining encryptPassword, encryptVCode, and encryptVHash all as one function
       *
       * @param {String} passphrase  Can be verificationCode, verificationHash, or password
       * @param {Function} callback
       * @return {String}
       * @api public
       */
      encryptify: function(passphrase, callback) {
        if(!passphrase || !this.salt) {
          return null;
        }
        (typeof passphrase !== 'string') ? passphrase = passphrase.toString() : passphrase = passphrase;
        var defaultIterations = 10000;
        var defaultKeyLength = 64;
        var defaultDigest = 'sha512';
        var salt = new Buffer(this.salt, 'base64');
        if(!callback) {
          return crypto.pbkdf2Sync(passphrase, salt, defaultIterations, defaultKeyLength, defaultDigest).toString('base64');
        }

        return crypto.pbkdf2(passphrase, salt, defaultIterations,defaultKeyLength, defaultDigest, (err,key) => {
          if(err) {
            callback(err);
          } else {
            callback(null,key.toString('base64'));
          }
        })
      },

      //removes the need for authenticate, elucidate and decipher
      decryptify: function(fieldName, rawCode, callback) {
        if(!callback) {
          return this[fieldName] === this.encryptify(rawCode);
        }
        this.encryptify(rawCode, (err,pwdGen) => {
          if(err) {
            return callback(err);
          }
          if(this[fieldName] === pwdGen) {
            callback(null,true);
          } else {
            callback(null,false)
          }
        })
      },
    },
  });
  return User;
};

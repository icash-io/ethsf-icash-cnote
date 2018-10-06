'use strict';

import express from 'express';
import passport from 'passport';
import { signToken } from '../auth.service';
import { User } from '../../db/models';
import _ from 'lodash';
var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    console.log('ERROR:', err);
    console.log('INFO:', info);
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }
    var token = signToken(user.id, user.role);
    console.log("TOKEN: ",token);
    res.json({ token });
  })(req, res, next)
});

router.post('/identify-email', function(req,res,next) {
  return User.findOne({
    where: { email: req.body.email },
    attributes: ['id'],
  }).then(user => {
      if (!user) {
        res.json({message: 'User not found'})
      } else {
        res.json(user)
      }

    })
    .catch(handleError(res))
})

//in recover password
router.post('/reauthorize',function(req,res,next){
  return User.findOne({
    where: { id: req.body.user.id },
    attributes: { exclude: ['salt', 'password'] },
  }).then(user => {
      if (!user) {  throw new Error('user not found');}
      return user;
    })
    .then(user => {
      return user.decryptify('verificationHash',req.body.code, function (err,verified){
        if (err) {return res.send(err)}
        if (verified) {
          res.status(202).json({message: "Verification Successful"})
        } else {
          res.status(204).json({message: 'Verfiication Failed'})
        }
      })
    })
    .catch(handleError(res))
})

router.post('/verification',function (req,res,next){
  return User.findOne({
    where: { id: req.body.user.id },
    attributes: { exclude: ['salt', 'password'] },
  }).then(user => {
      if (!user) { 
        throw new Error('user not found');
      }
      
      if (user.hasVerified) { 
        throw new Error('already verified');
      }

      return user;
    })
    .then(user => {
      console.log("user: ",user);
      return user.decryptify('verificationCode',req.body.code,function (err,verified){
        if (err) {
          return res.send(err)
        }
        if (verified) {
          user.hasVerified = true;
          return user.save()
            .then(() => {
              res.status(202).json({message: 'Verification Successful'})//does this have hasVerified to be true?
            })
            .catch(handleError(res))
        }else {
          // var user = _.omit(user,['verificationCode','salt','password']) 
          res.status(204).json({message: 'Verification failed'})
        }
      })
    })
    .catch(handleError(res))
})

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    if (err.message == 'user not found') {
      res.status(404).send(err);
    }else if (err.message == 'already verified') {
      res.status(410).send(err);
    }else {
      res.status(statusCode).send(err);
    }
    
  };
}


export default router;

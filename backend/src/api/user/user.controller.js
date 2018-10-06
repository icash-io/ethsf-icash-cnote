'use strict';

import { User, KycDocument } from '../../db/models';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import { keepParams } from '../../utilities/utilities';
import { sendStartKycEmail, sendResetTokenEmail } from '../../helpers/emailHelper';

const publicParams = [
  'id',
  'email',
  'kycVerified',
  'kycPending',
  'kycAttempts',
];

function handleError(res, error, statusCode) {
  statusCode = statusCode || 500;
  console.log('ERROR:', error);
  res.status(statusCode).json(error);
}

/**
 * Creates a new user
 */
export async function createUser(req, res, next) {
  try {
    const newUser = await User.createRecord(req.body);
    const resultObj = keepParams(newUser, publicParams);
    sendStartKycEmail(newUser.email, newUser.accessToken);
    res.status(200).json(resultObj);
  } catch (error) {
    let code = 422 || error.code;
    let message = {error: error.message};
    if(error.errors) {
      code = 409;
      message.error = error.errors[0].message;
    }
    handleError(res, message, code);
  }
}

/**
 * Updates a user
 * restriction: 'role'(self), 'admin'
 */
export async function updateUser(req, res, next) {
  try {
    let user;
    if (req.user.role === 'admin') {
      const userId = req.params.id;
      user = await User.findOne({
        where: {id: userId},
      });
      if (!user) {
        res.status(404).end();
        return;
      }
    } else {
      user = req.user;
    }

    const updatedUser = await user.update(req.body);
    const resultObj = keepParams(updatedUser, publicParams);
    res.status(200).json(resultObj);
  } catch (error) {
    handleError(res, error);
  }
}

/**
 * Resets user access token and sends email
 */
export async function resetAccessToken(req, res, next) {
  try {
    const email = req.body.email;
    let user = await User.findOne({
      where: {email: email},
    });
    if (!user) {
      res.status(404).json({ error: 'email not found' });
      return;
    }
    user = await user.resetAccessToken();
    sendResetTokenEmail(user.email, user.accessToken);
    const resultObj = keepParams(user, publicParams);
    res.status(200).json({success: true});
  } catch (error) {
    let code = 422 || error.code;
    let message = {error: error.message};
    if(error.errors) {
      code = 409;
      message.error = error.errors[0].message;
    }
    handleError(res, message, code);
  }
}

/**
 * Get self
 * restriction: 'user'(self)
 */
export async function me(req, res, next) {
  const user = req.user;
  if (!user) {
    res.status(404).end();
    return;
  }
  res.status(200).json(user);
}

/**
 * Get a single user
 * restriction: 'admin'
 */
export async function getUser(req, res, next) {
  var userId = req.params.id;

  try {
    const user = await User.findOne({
      where: { id: userId },
      include: [KycDocument],
      attributes: {
        exclude: ['accessToken'],
      },
    });
    if (!user) {
      res.status(404).end();
      return;
    }
    res.status(200).json(user);
  } catch(error) {
    let code = 422 || error.code;
    let message = {error: error.message};
    if(error.errors) {
      code = 409;
      message.error = error.errors[0].message;
    }
    handleError(res, message, code);
  }
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      include: [KycDocument],
      attributes: {
        exclude: ['accessToken'],
      },
    });
    res.status(200).json(users);
  } catch(error) {
    let code = 422 || error.code;
    let message = {error: error.message};
    if(error.errors) {
      code = 409;
      message.error = error.errors[0].message;
    }
    handleError(res, message, code);
  }
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export async function getVerifiedUsers(req, res) {
  try {
    const users = await User.findAll({
      where: { kycVerified: true },
      include: [KycDocument],
      attributes: {
        exclude: ['accessToken'],
      },
    });
    res.status(200).json(users);
  } catch(error) {
    let code = 422 || error.code;
    let message = {error: error.message};
    if(error.errors) {
      code = 409;
      message.error = error.errors[0].message;
    }
    handleError(res, message, code);
  }
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export async function deleteUser(req, res) {
  var userId = req.params.id;

  try {
    const user = await User.findOne({
      where: {id: userId },
    });
    if (!user) {
      res.status(404).end();
      return;
    }
    await user.destroy();
    res.status(200).end();
  } catch(error) {
    let code = 422 || error.code;
    let message = {error: error.message};
    if(error.errors) {
      code = 409;
      message.error = error.errors[0].message;
    }
    handleError(res, message, code);
  }
}

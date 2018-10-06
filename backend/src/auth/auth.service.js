'use strict';

import passport from 'passport';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import { User, KycDocument } from '../db/models';

var validateJwt = expressJwt({
  secret: process.env.SESSION_SECRET,
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 * Example from NPM docs: https://www.npmjs.com/package/composable-middleware
 *  var mw =
 *    composable_middleware()
 *      .use(connect.logger())
 *      .use(connect.gzip());
 *
 */
export function isAuthenticated() {
  return compose()
    // Validate accessToken (no password used)
    .use(async function(req, res, next) {
      // Token can be in query params or in auth header
      const accessToken = req.query.accessToken || req.headers.authorization;
      try {
        const user = await User.findOne({
          where: {accessToken: accessToken},
          include: [KycDocument],
        });
        if (!user) {
          return res.status(403).end();
        }
        req.user = user;
        next();
      } catch (err) {
        next(err);
      }
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
          config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }

    });
}

// NOT USED - No password login
/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  return jwt.sign({ id: id, role: role }, process.env.SESSION_SECRET, {
    expiresIn: 60 * 60 * 5,
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user.id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}

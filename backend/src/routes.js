/**
 * Main application routes
 */

'use strict';

// import errors from './components/errors';
import path from 'path';

export default function(app) {
  app.use('/api/user', require('./api/user'));

  app.use('/api/doc', require('./api/kycDocument'));
  
  // app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  //  .get(errors[404]);

  //test
}

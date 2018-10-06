'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import { User } from '../db/models';

// Passport Configuration
require('./local/passport').setup(User, config);
require('./google/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local').default);
router.use('/google', require('./google').default);


export default router;

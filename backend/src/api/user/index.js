'use strict';

import { Router } from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.post('/', controller.createUser);
router.get('/hello',  (req,res) => {
  res.json({'hello':'world'})
})
// router.put('/', auth.isAuthenticated(), controller.updateUser); 
router.get('/', auth.isAuthenticated(), controller.me); 

router.post('/resettoken', controller.resetAccessToken);

router.get('/all', auth.hasRole('admin'), controller.getAllUsers);
router.get('/verified', auth.hasRole('admin'), controller.getVerifiedUsers);
router.get('/:id', auth.hasRole('admin'), controller.getUser); 
router.put('/:id', auth.hasRole('admin'), controller.updateUser); 
router.delete('/:id', auth.hasRole('admin'), controller.deleteUser);

module.exports = router;

'use strict';

import { Router } from 'express';
import * as controller from './kycDocument.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.post('/', auth.isAuthenticated(), controller.createKycDocument);

router.get('/all', auth.hasRole('admin'), controller.getAllKycDocuments);
router.get('/:id', auth.hasRole('admin'), controller.getKycDocument); 
router.put('/:id', auth.hasRole('admin'), controller.updateKycDocument); 
router.delete('/:id', auth.hasRole('admin'), controller.deleteKycDocument);

module.exports = router;

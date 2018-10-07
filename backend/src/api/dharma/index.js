'use strict';

import { Router } from 'express';
import * as controller from './dharma.controller';




var router = new Router();

router.get('/hello',  (req,res) => {
  res.json({'credit':'dharma'})
})

router.post('/create', controller.createLoanRequest);




module.exports = router;
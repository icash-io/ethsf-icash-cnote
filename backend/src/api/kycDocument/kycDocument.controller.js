'use strict';

import { User, KycDocument } from '../../db/models';
import { keepParams } from '../../utilities/utilities';
import { sendKyc } from '../../helpers/kycHelper';
import config from '../../config/environment';
import moment from 'moment';

const publicParams = [
  'type',
  'isVerified',
  'User',
];

const KYC_TIMEOUT = 5; //minutes

function handleError(res, error, statusCode) {
  statusCode = statusCode || 500;
  console.log('ERROR:', error);
  res.status(statusCode).json(error);
}

/**
 * Uploads a new KYC Document
 * restriction: 'role'(self)
 */
export async function createKycDocument(req, res, next) {
  try {
    const user = req.user;
    const docObj = req.body.doc;
    const kycData = req.body.data;

    if (!user) {
      res.status(404).end();
      return;
    }

    const updatedAt = moment(user.updatedAt);

    if (user.kycAttempts >= config.MAX_KYC_ATTEMPTS) {
      res.status(423).json({error: "too many kyc attempts"});
      return;
    }
    else if (user.kycVerified) {
      res.status(422).json({error: "user already verified"});
      return;
    }
    else if (user.kycPending && updatedAt.isAfter(moment().add(KYC_TIMEOUT, 'minutes'))) {
      res.status(429).json({error: "verification already in progress"});
      return;
    }

    docObj.isVerified = false;
    const newDoc = await KycDocument.createRecord(docObj, user);
    const resultObj = keepParams(newDoc, publicParams);

    // Update user's status and add KYC to queue
    await user.update({
      kycPending:true,
      kycAttempts: user.kycAttempts+1,
      firstName: kycData.first_name,
      lastName: kycData.last_name,
    });
    await sendKyc(kycData, user.id, newDoc.id);

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
 * Updates a Kyc Document
 * restriction: 'role'(self), 'admin'
 */
export async function updateKycDocument(req, res, next) {
  try {
    const docId = req.params.id;
    let kycDoc = await KycDocument.findOne({
      where: {id: docId},
    });
    if (!kycDoc) {
      res.status(404).end();
      return;
    }

    // Make sure user can only update their own documents
    if (req.user.role === 'user') {
      if (req.user.id != kycDoc.User.id) {
        res.status(403).end();
        return;
      }
    }

    const updatedDoc = await kycDoc.update(req.body);
    const resultObj = keepParams(updatedDoc, publicParams);
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
 * Get a single document
 * restriction: 'admin'
 */
export async function getKycDocument(req, res, next) {
  var docId = req.params.id;

  try {
    const kycDoc = await KycDocument.findOne({
      where: {id: docId},
    });
    if (!kycDoc) {
      res.status(404).end();
      return;
    }
    res.status(200).json(kycDoc);
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
export async function getAllKycDocuments(req, res) {
  try {
    const kycDocs = await KycDocument.findAll();
    res.status(200).json(kycDocs);
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
export async function deleteKycDocument(req, res) {
  var docId = req.params.id;

  try {
    const kycDoc = await KycDocument.findOne({
      where: { id: docId },
    });
    if (!kycDoc) {
      res.status(404).end();
      returnl
    }
    await kycDoc.destroy();
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

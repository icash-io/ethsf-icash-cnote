import crypto from 'crypto';
import axios from 'axios';
import qs from 'querystring';
import { User, KycDocument } from '../db/models'
import { sendKycDoneBeforeSaleEmail, sendKycDoneDuringSaleEmail } from '../helpers/emailHelper';

function ksort(obj) {
  let keys = Object.keys(obj).sort(),
    sortedObj = {};

  for (let i in keys) {
    sortedObj[keys[i]] = obj[keys[i]];
  }

  return sortedObj;
}

export default class KycSender {
  static async process(userId, docId, kyc, job) {
    KycSender._sendKyc(userId, docId, kyc, job);
    return await Promise.resolve();
  }

  static async _sendKyc(userId, docId, kyc, job) {
    kyc.client_id = process.env.SHUFTI_CLIENT_ID;
    const sortedKyc = ksort(kyc);
    const rawKyc = Object.values(sortedKyc).join('') + process.env.SHUFTI_API_KEY;
    const signature = crypto
      .createHash('sha256')
      .update(rawKyc)
      .digest('hex');
    kyc.signature = signature;

    const res = await axios.post(
      process.env.SHUFTI_ENDPOINT,
      qs.stringify(kyc)
    );

    const user = await User.findOne({ where: {id: userId} });
    const kydDoc = await KycDocument.findOne({ where: {id: docId} });
    const kycStatus = res.data.status_code;
    if (kycStatus === 'SP1' || kycStatus === 'SP2') {
      await user.update({ kycVerified: true, kycPending: false });
      await kydDoc.update({ isVerified: true });
      console.log('User ' + userId + ' verified');
      // IF STAGE 1
      if (true){
        sendKycDoneBeforeSaleEmail(user.email);
      } else {
        // IF STAGE 2
        sendKycDoneDuringSaleEmail(user.email, process.env.ICO_ETH_ADDRESS, user.ethAddress);
      }
    } else {
      await user.update({ kycVerified: false, kycPending: false });
      await kydDoc.update({ isVerified: false });
      console.log('User ' + userId + ' verification failed');
    }
    console.log('Job Completed ', job.id);
    job.remove();
  }
}
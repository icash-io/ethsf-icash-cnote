require('dotenv').config();

import 'babel-polyfill';
import queue from './queue';
import KycSender from './kycSender';

queue.process((job) => {
  const kycToDo = job.data.kyc || [];

  return KycSender.process(kycToDo.userId, kycToDo.docId, kycToDo.kyc, job).then(() => {
    console.log('KYC processed by worker: ', job.id);
  }).catch((error) => {
    console.log('Failed to complete job: ', job.id);
    console.log(error);
  });
});

console.log('Worker is ready to accept kyc tasks');

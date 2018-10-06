import queue from '../kycworker/queue';

export async function sendKyc(kycData, userId, docId) {
  const kyc = {
    kyc: kycData,
    userId: userId,
    docId: docId,
  };
  await queue.add({ kyc: kyc });
}

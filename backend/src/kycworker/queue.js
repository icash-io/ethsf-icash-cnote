import queue from 'bull';

const redisConfig = {
  options: { enable_offline_queue: false },
  args: [process.env.REDIS_URL],
};

const que = queue('kyc-queue', ...redisConfig.args, redisConfig.options);

export default que;

const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  NETWORK: process.env.NETWORK,
  INFURA_WEBSOCKET: process.env.INFURA_WEBSOCKET,

  // Either an ABI file or Etherscan api key + host must be provided:
  CONTRACT_ABI_URL: process.env.CONTRACT_ABI_URL,

  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  ETHERSCAN_HOST: process.env.ETHERSCAN_HOST || 'api.etherscan.io',

  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  UTT_MIN_BLOCK: parseInt(process.env.UTT_MIN_BLOCK),

  PAYMENT_ADDRESS: process.env.PAYMENT_ADDRESS,
  RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://localhost',
  RABBITMQ_QUEUE: process.env.RABBITMQ_QUEUE,
};

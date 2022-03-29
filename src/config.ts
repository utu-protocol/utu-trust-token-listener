import 'dotenv/config';

export const NETWORK = process.env.NETWORK;
export const INFURA_WEBSOCKET = process.env.INFURA_WEBSOCKET;

// Either an ABI file or Etherscan api key + host must be provided:
export const CONTRACT_ABI_URL = process.env.CONTRACT_ABI_URL;

export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
export const ETHERSCAN_HOST = process.env.ETHERSCAN_HOST || 'api.etherscan.io';

export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
export const UTT_MIN_BLOCK = parseInt(process.env.UTT_MIN_BLOCK);
export const UTT_MAX_BLOCK_SIZE =
  parseInt(process.env.UTT_MAX_BLOCK_SIZE) || 3500;

export const PAYMENT_ADDRESS = process.env.PAYMENT_ADDRESS;
export const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
export const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE;
export const TWITTER_CONNECTION_TYPE_ID = 1;
export const TELEGRAM_CONNECTION_TYPE_ID = 2;

export const EXPECTED_PONG_BACK = 15000;
export const KEEP_ALIVE_CHECK_INTERVAL = 75000;

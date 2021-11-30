import { ethers } from 'ethers';
import {
  CONTRACT_ADDRESS,
  ETHERSCAN_API_KEY,
  ETHERSCAN_HOST,
  INFURA_WEBSOCKET,
  PAYMENT_ADDRESS,
} from '../config';
const client = require('node-rest-client-promise').Client();

const etherscanUrl = `http://${ETHERSCAN_HOST}/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`;

const provider = new ethers.providers.WebSocketProvider(INFURA_WEBSOCKET);

let contract;

export const init = async () => {
  const CONTRACT_ABI = await getContractAbi();
  contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

export const getContractAbi = async () => {
  const etherscanResponse = await client.getPromise(etherscanUrl);
  const CONTRACT_ABI = JSON.parse(etherscanResponse.data.result);
  return CONTRACT_ABI;
};

export const balance = async (address) => {
  await init();
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatEther(balance);
};

export const blockNumber = async () => {
  return await provider.getBlockNumber();
};

export const eventQuery = async (
  eventName = 'Endorse',
  startBlock = 11021335,
  endBlock = 11021338,
) => {
  return await contract.queryFilter(eventName, startBlock, endBlock);
};

export const blockTimestamp = async (blockNumber) => {
  const block = await provider.getBlock(blockNumber); // block is null; the regular provider apparently doesn't know about this block yet.
  const creationTime = block.timestamp;
  return creationTime;
};

export const getTransfers = async (address, blocks = -1000) => {
  await init();
  const endorsesFilter = await contract.filters.Endorse(
    address,
  );
  const endorses = await contract.queryFilter(endorsesFilter, blocks);
  return endorses;
};

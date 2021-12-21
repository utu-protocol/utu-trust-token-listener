import { promises as fsp }  from "fs";
import { ethers } from 'ethers';
import {
  CONTRACT_ADDRESS,
  ABI_FILE,
  ETHERSCAN_API_KEY,
  ETHERSCAN_HOST,
  INFURA_WEBSOCKET,
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
  const input = ABI_FILE
    ? await fsp.readFile(ABI_FILE)
    : (await client.getPromise(etherscanUrl)).data.result;

  const CONTRACT_ABI = JSON.parse(input);
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
  startBlock = 13809274,
  endBlock = 13819274,
) => {
  return await contract.queryFilter(eventName, startBlock, endBlock);
};

export const blockTimestamp = async (blockNumber) => {
  const block = await provider.getBlock(blockNumber); // block is null; the regular provider apparently doesn't know about this block yet.
  const creationTime = block.timestamp;
  return creationTime;
};

export const getEndorsements = async (address, blocks = -1000) => {
  await init();
  const endorsesFilter = await contract.filters.Endorse(
    address,
  );
  const endorses = await contract.queryFilter(endorsesFilter, blocks);
  return endorses;
};

export const getEndorsementsActive = async (address, blocks = -1000) => {
  await init();
  return await eventQuery('Endorse', 13809274, 13812274)
};

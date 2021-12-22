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

const UTT_MINED_AT_BLOCK = 0;

export const getContract = async () => {
  const CONTRACT_ABI = await getContractAbi();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

export const getContractAbi = async () => {
  const input = ABI_FILE
    ? await fsp.readFile(ABI_FILE)
    : (await client.getPromise(etherscanUrl)).data.result;

  return JSON.parse(input);
};

export const balance = async (address) => {
  const contract = await getContract();
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatEther(balance);
};

export const blockNumber = async () => {
  return await provider.getBlockNumber();
};

export const eventQuery = async (
  eventName = 'Endorse',
  startBlock = UTT_MINED_AT_BLOCK
) => {
  return await contract.queryFilter(eventName, startBlock);
};

export const blockTimestamp = async (blockNumber) => {
  const block = await provider.getBlock(blockNumber); // block is null; the regular provider apparently doesn't know about this block yet.
  return block.timestamp;
};

export const getEndorsements = async (targetAddress, fromBlock = UTT_MINED_AT_BLOCK) => {
  const contract = await getContract();
  const endorsesFilter = await contract.filters.Endorse(null, targetAddress);
  return await contract.queryFilter(endorsesFilter, fromBlock);
};


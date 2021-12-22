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

const UTT_MIN_BLOCK = 0;

// exported functions

export async function balance(address) {
  const contract = await getContract();
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatEther(balance);
}

export async function getEndorsements(targetAddress, fromBlock = UTT_MIN_BLOCK) {
  const toBlock = await provider.getBlockNumber();
  const contract = await getContract();
  const endorsesFilter = await contract.filters.Endorse(null, targetAddress);
  return {
    fromBlock: fromBlock,
    toBlock: toBlock,
    endorsementEvents: await contract.queryFilter(endorsesFilter, fromBlock, toBlock)
  };
}

// private helper functions

async function getContract() {
  const CONTRACT_ABI = await getContractAbi();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}

async function getContractAbi() {
  const input = ABI_FILE
    ? await fsp.readFile(ABI_FILE)
    : (await client.getPromise(etherscanUrl)).data.result;

  return JSON.parse(input);
}

async function blockTimestamp(blockNumber) {
  const block = await provider.getBlock(blockNumber); // block is null; the regular provider apparently doesn't know about this block yet.
  return block.timestamp;
}



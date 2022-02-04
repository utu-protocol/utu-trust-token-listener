import { promises as fsp } from "fs";
import { ethers } from "ethers";
import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI_URL,
  ETHERSCAN_API_KEY,
  ETHERSCAN_HOST,
  INFURA_WEBSOCKET,
  UTT_MIN_BLOCK,
  UTT_MAX_BLOCK_SIZE,
} from "../config";
const client = require("node-rest-client-promise").Client();

const etherscanUrl = `http://${ETHERSCAN_HOST}/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`;

const provider = new ethers.providers.WebSocketProvider(INFURA_WEBSOCKET);

// exported functions

export async function balance(address) {
  const contract = await getContract();
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatEther(balance);
}

export async function getEndorsements(
  targetAddress,
  fromBlock = UTT_MIN_BLOCK
) {
  const toBlock = await provider.getBlockNumber();
  const minBlock = fromBlock || toBlock - (UTT_MAX_BLOCK_SIZE - 1);
  return {
    fromBlock: fromBlock,
    toBlock: minBlock,
    endorsementEvents: await getFilteredEndorsements(
      targetAddress,
      minBlock,
      toBlock
    ),
  };
}

export async function getAddConnections(
  targetAddress,
  fromBlock = UTT_MIN_BLOCK
) {
  const toBlock = await provider.getBlockNumber();
  const minBlock = fromBlock || toBlock - (UTT_MAX_BLOCK_SIZE - 1);
  return {
    fromBlock: minBlock,
    toBlock: toBlock,
    addConnectionEvents: await getFilteredAddConnections(
      targetAddress,
      minBlock,
      toBlock
    ),
  };
}

// private helper functions

async function getContract() {
  const CONTRACT_ABI = await getContractAbi();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}

async function getContractAbi() {
  const input = CONTRACT_ABI_URL
    ? (await client.getPromise(CONTRACT_ABI_URL)).data.result
    : (await client.getPromise(etherscanUrl)).data.result;

  return JSON.parse(input);
}

async function getFilteredEndorsements(targetAddress, fromBlock, toBlock) {
  // When fromBlock > toBlock = last block, contract.queryFilter() unexpectedly still returns the events for the last
  // block. But we never want to return event outside the given range, therefore just return an empty error in this
  // case:
  if (fromBlock > toBlock) return [];

  const contract = await getContract();
  const endorsesFilter = await contract.filters.Endorse(null, targetAddress);
  return contract.queryFilter(endorsesFilter, fromBlock, toBlock);
}

async function getFilteredAddConnections(targetAddress, fromBlock, toBlock) {
  // When fromBlock > toBlock = last block, contract.queryFilter() unexpectedly still returns the events for the last
  // block. But we never want to return event outside the given range, therefore just return an empty error in this
  // case:
  if (fromBlock > toBlock) return [];

  const contract = await getContract();
  const connectionsFilter = await contract.filters.AddConnection(targetAddress);
  return contract.queryFilter(connectionsFilter, fromBlock, toBlock);
}

async function blockTimestamp(blockNumber) {
  const block = await provider.getBlock(blockNumber); // block is null; the regular provider apparently doesn't know about this block yet.
  return block.timestamp;
}

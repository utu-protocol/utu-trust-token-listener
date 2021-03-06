import { ethers } from 'ethers';
// import * as NodeCache from 'node-cache';
import {
  CONTRACT_ADDRESS,
  // ETHERSCAN_API_KEY,
  // ETHERSCAN_HOST,
  INFURA_WEBSOCKET,
  UTT_MAX_BLOCK_SIZE,
  UTT_MIN_BLOCK,
  EXPECTED_PONG_BACK,
  KEEP_ALIVE_CHECK_INTERVAL,
} from 'src/config';

import CONTRACT_ABI from '../contracts/UTT.abi.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const NodeCache = require('node-cache');
// const nodeCache = new NodeCache();

// const etherscanUrl = `http://${ETHERSCAN_HOST}/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`;
let provider = null;

export const startConnection = () => {
  provider = new ethers.providers.WebSocketProvider(INFURA_WEBSOCKET);

  let pingTimeout = null;
  let keepAliveInterval = null;

  provider._websocket.on('open', () => {
    keepAliveInterval = setInterval(() => {
      provider._websocket.ping();

      // Use `WebSocket#terminate()`, which immediately destroys the connection,
      // instead of `WebSocket#close()`, which waits for the close timer.
      // Delay should be equal to the interval at which your server
      // sends out pings plus a conservative assumption of the latency.
      pingTimeout = setTimeout(() => {
        provider._websocket.terminate();
      }, EXPECTED_PONG_BACK);
    }, KEEP_ALIVE_CHECK_INTERVAL);

    // TODO: handle contract listeners setup + indexing
  });

  provider._websocket.on('close', () => {
    console.error('The websocket connection was closed');
    clearInterval(keepAliveInterval);
    clearTimeout(pingTimeout);
    startConnection();
  });

  provider._websocket.on('pong', () => {
    clearInterval(pingTimeout);
  });
};

startConnection();

// exported functions

export async function balance(address) {
  const contract = await getContract();
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatUnits(balance, 0);
}

export async function getEndorsements(
  sourceAddress,
  targetAddress,
  fromBlock = UTT_MIN_BLOCK,
) {
  const toBlock = await provider.getBlockNumber();
  const minBlock = fromBlock || toBlock - (UTT_MAX_BLOCK_SIZE - 1);
  return {
    fromBlock: minBlock,
    toBlock: toBlock,
    endorsementEvents: await getFilteredEndorsements({
      sourceAddress,
      targetAddress,
      fromBlock: minBlock,
      toBlock,
    }),
  };
}

export async function getAddConnections(
  targetAddress,
  fromBlock = UTT_MIN_BLOCK,
) {
  const toBlock = await provider.getBlockNumber();
  const minBlock = fromBlock || toBlock - (UTT_MAX_BLOCK_SIZE - 1);
  return {
    fromBlock: minBlock,
    toBlock: toBlock,
    addConnectionEvents: await getFilteredAddConnections(
      targetAddress,
      minBlock,
      toBlock,
    ),
  };
}

// private helper functions

async function getContract() {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}

// async function getContractAbi() {
//   let abi = nodeCache.get('contractAbi');
//   if (!abi) {
//     const input = CONTRACT_ABI_URL
//       ? (await axios.get(CONTRACT_ABI_URL)).data.result
//       : (await axios.get(etherscanUrl)).data.result;

//     const parsed = JSON.parse(input);
//     nodeCache.set('contractAbi', parsed, 86400);
//     abi = parsed;
//   }
//   return abi;
// }

async function getFilteredEndorsements({
  sourceAddress,
  targetAddress,
  fromBlock,
  toBlock,
}) {
  // When fromBlock > toBlock = last block, contract.queryFilter() unexpectedly still returns the events for the last
  // block. But we never want to return event outside the given range, therefore just return an empty error in this
  // case:
  if (fromBlock > toBlock) return [];
  const allEvents = [];
  const contract = await getContract();
  const endorsesFilter = await contract.filters.Endorse(
    sourceAddress || null,
    targetAddress || null,
  );
  for (let i = fromBlock; i < toBlock; i += UTT_MAX_BLOCK_SIZE) {
    const _startBlock = i;
    const _endBlock = Math.min(toBlock, i + (UTT_MAX_BLOCK_SIZE - 1));
    const events = await contract.queryFilter(
      endorsesFilter,
      _startBlock,
      _endBlock,
    );
    allEvents.push(...events);
  }
  return allEvents;
}

async function getFilteredAddConnections(targetAddress, fromBlock, toBlock) {
  // When fromBlock > toBlock = last block, contract.queryFilter() unexpectedly still returns the events for the last
  // block. But we never want to return event outside the given range, therefore just return an empty error in this
  // case:
  if (fromBlock > toBlock) return [];
  const allEvents = [];

  const contract = await getContract();
  const connectionsFilter = await contract.filters.AddConnection(targetAddress);
  for (let i = fromBlock; i < toBlock; i += UTT_MAX_BLOCK_SIZE) {
    const _startBlock = i;
    const _endBlock = Math.min(toBlock, i + (UTT_MAX_BLOCK_SIZE - 1));
    const events = await contract.queryFilter(
      connectionsFilter,
      _startBlock,
      _endBlock,
    );
    allEvents.push(...events);
  }
  return allEvents;
}

async function blockTimestamp(blockNumber) {
  const block = await provider.getBlock(blockNumber); // block is null; the regular provider apparently doesn't know about this block yet.
  return block.timestamp;
}

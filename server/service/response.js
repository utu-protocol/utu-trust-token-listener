import { ethers } from "ethers";

export function endorsementsResponse({ endorsementEvents, fromBlock, toBlock }) {
  const endorsements = endorsementEvents.map((endorsementEvent) => ({
    source: endorsementEvent.args[0],
    target: endorsementEvent.args[1],
    value: Number(
      ethers.utils.formatEther(ethers.BigNumber.from(endorsementEvent.args[3]))
    ),
    block: {
      number: endorsementEvent.blockNumber,
    }
  }));

  return {
    fromBlock: {
      number: fromBlock,
    },
    toBlock: {
      number: toBlock,
    },
    endorsements: endorsements,
  };
}

export function addConnectionsResponse({ addConnectionEvents, fromBlock, toBlock }) {
  const connections = addConnectionEvents.map((event) => ({
    address: event.args[0],
    socialId: event.args[1],
  }));

  return {
    fromBlock: {
      number: fromBlock,
    },
    toBlock: {
      number: toBlock,
    },
    connections,
  };
}

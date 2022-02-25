import {ethers} from "ethers";
import {
  TELEGRAM_CONNECTION_TYPE_ID,
  TWITTER_CONNECTION_TYPE_ID,
} from "../config";

export function endorsementsResponse({ endorsementEvents, fromBlock, toBlock }) {
  const endorsements = endorsementEvents.map((endorsementEvent) => ({
    source: endorsementEvent.args[0],
    target: endorsementEvent.args[1],
    value: Number(ethers.utils.formatEther(ethers.BigNumber.from(endorsementEvent.args[3]))),
    block: {
      number: endorsementEvent.blockNumber
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

function getSocialConnectionType(type) {
  switch (type) {
    case TELEGRAM_CONNECTION_TYPE_ID:
      return "telegram";
    case TWITTER_CONNECTION_TYPE_ID:
      return "twitter";
    default:
      return type;
  }
}

export function addConnectionsResponse({
  addConnectionEvents,
  fromBlock,
  toBlock,
}) {
  const connections = addConnectionEvents.map((event) => ({
    address: event.args[0],
    type: getSocialConnectionType(event.args[1].toNumber()),
    hash: event.args[2],
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

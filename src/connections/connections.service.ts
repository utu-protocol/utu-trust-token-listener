import { Injectable } from '@nestjs/common';
import {
  TELEGRAM_CONNECTION_TYPE_ID,
  TWITTER_CONNECTION_TYPE_ID,
} from 'src/config';
import { getAddConnections } from 'src/lib/ethereum';
import ConnectionDto from './dto/connection.dto';

const getSocialConnectionType = (type) => {
  switch (type) {
    case TELEGRAM_CONNECTION_TYPE_ID:
      return 'telegram';
    case TWITTER_CONNECTION_TYPE_ID:
      return 'twitter';
    default:
      return type;
  }
};

@Injectable()
export class ConnectionsService {
  async findAll({ target_address }: ConnectionDto) {
    const results = await getAddConnections(target_address);

    return this.response(results);
  }

  private response({ addConnectionEvents, fromBlock, toBlock }) {
    const connections = addConnectionEvents.map((event) => ({
      address: String(event.args[0]).toLowerCase(),
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
}

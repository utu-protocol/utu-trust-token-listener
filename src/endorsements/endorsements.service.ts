import { Injectable } from '@nestjs/common';
import { getEndorsements } from 'src/lib/ethereum';
import EndorsementDto from './dto/endorsement.dto';

@Injectable()
export class EndorsementsService {
  async findAll(endorsementDto: EndorsementDto) {
    const results = await getEndorsements(
      endorsementDto.source_address,
      endorsementDto.target_address,
    );
    return this.response(results);
  }

  private response({ endorsementEvents, fromBlock, toBlock }) {
    const endorsements = endorsementEvents.map((endorsementEvent) => ({
      source: String(endorsementEvent.args[0]).toLowerCase(),
      target: String(endorsementEvent.args[1]).toLowerCase(),
      value: Number(endorsementEvent.args._value),
      block: {
        number: endorsementEvent.blockNumber,
      },
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
}

import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { getEndorsements } from 'src/lib/ethereum';
import EndorsementDto from './dto/endorsement.dto';

@Injectable()
export class EndorsementsService {
  async findAll(endorsementDto: EndorsementDto) {
    const results = await getEndorsements(
      endorsementDto.source_address,
      endorsementDto.target_address,
      endorsementDto.from_block
        ? parseInt(endorsementDto.from_block)
        : undefined,
    );
    return this.response(results);
  }

  private response({ endorsementEvents, fromBlock, toBlock }) {
    const endorsements = endorsementEvents.map((endorsementEvent) => ({
      source: endorsementEvent.args[0],
      target: endorsementEvent.args[1],
      value: Number(endorsementEvent.args[3]),
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

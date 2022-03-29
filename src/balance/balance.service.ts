import { Injectable } from '@nestjs/common';
import { balance } from 'src/lib/ethereum';

@Injectable()
export class BalanceService {
  async findOne(address: string) {
    return await balance(address);
  }
}

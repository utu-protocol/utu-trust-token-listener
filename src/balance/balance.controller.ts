import { Controller, Get, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get(':address')
  findOne(@Param('address') address: string) {
    return this.balanceService.findOne(address);
  }
}

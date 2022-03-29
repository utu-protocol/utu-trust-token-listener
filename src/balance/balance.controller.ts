import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
@UseInterceptors(CacheInterceptor)
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get(':address')
  findOne(@Param('address') address: string) {
    return this.balanceService.findOne(address);
  }
}

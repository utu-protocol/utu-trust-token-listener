import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import EndorsementDto from './endorsements/dto/endorsement.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/total-staked-amount')
  getTotalStakedAmount(@Query() endorsementDto: EndorsementDto) {
    return '99.9';
  }
}

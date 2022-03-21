import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import EndorsementDto from './endorsements/dto/endorsement.dto';
import { EndorsementsService } from './endorsements/endorsements.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly endorsementsService: EndorsementsService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/total-staked-amount')
  async getTotalStakedAmount(@Query() endorsementDto: EndorsementDto) {
    const all = await this.endorsementsService.findAll(endorsementDto);
    return all.endorsements.reduce(
      (previousValue, currentValue) => previousValue.value + currentValue.value,
      0,
    );
  }
}

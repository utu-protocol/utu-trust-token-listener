import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import EndorsementDto from './endorsements/dto/endorsement.dto';
import { EndorsementsService } from './endorsements/endorsements.service';

@Controller()
@UseInterceptors(CacheInterceptor)
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
      (sum, endorsement) => sum + endorsement.value,
      0,
    );
  }
}

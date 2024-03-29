import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { EndorsementsService } from './endorsements.service';
import EndorsementDto from './dto/endorsement.dto';

@Controller('endorsements')
export class EndorsementsController {
  constructor(private readonly endorsementsService: EndorsementsService) {}
  @Get()
  findAll(@Query() endorsementDto: EndorsementDto) {
    return this.endorsementsService.findAll(endorsementDto);
  }
}

import { Module } from '@nestjs/common';
import { EndorsementsService } from './endorsements.service';
import { EndorsementsController } from './endorsements.controller';

@Module({
  controllers: [EndorsementsController],
  providers: [EndorsementsService],
})
export class EndorsementsModule {}

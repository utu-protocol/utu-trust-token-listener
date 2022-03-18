import { IsNumberString, IsOptional, IsString } from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';
export default class EndorsementDto {
  @ApiPropertyOptional({
    description:
      'Target address of returned endorsements, i.e. the endorsed address.',
  })
  @IsString()
  @IsOptional()
  target_address: string;

  @ApiPropertyOptional({
    description: 'Source address of the endorser',
  })
  @IsString()
  @IsOptional()
  source_address: string;

  @ApiPropertyOptional({
    description:
      'Minimal block number for which to get endorsements. Defaults to the number of the block in  which the UTT contract was deployed.',
  })
  @IsNumberString()
  @IsOptional()
  from_block?: string;
}

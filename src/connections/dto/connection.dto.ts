import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export default class ConnectionDto {
  @ApiProperty({
    description:
      'Target address of returned connections, i.e. the connected address.',
  })
  @IsNotEmpty()
  target_address: string;

  @ApiPropertyOptional({
    description:
      'Minimal block number for which to get endorsements. Defaults to the number of the block in  which the UTT contract was deployed.',
  })
  @IsNumberString()
  @IsOptional()
  from_block?: string;
}

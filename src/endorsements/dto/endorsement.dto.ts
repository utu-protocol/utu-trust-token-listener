import { IsNumberString, IsOptional, IsString } from 'class-validator';

export default class EndorsementDto {
  @IsString()
  @IsOptional()
  target_address: string;

  @IsString()
  @IsOptional()
  source_address: string;

  @IsNumberString()
  @IsOptional()
  from_block?: string;
}

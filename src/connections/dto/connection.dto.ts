import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export default class ConnectionDto {
  @IsNotEmpty()
  target_address: string;

  @IsNumberString()
  @IsOptional()
  from_block?: string;
}

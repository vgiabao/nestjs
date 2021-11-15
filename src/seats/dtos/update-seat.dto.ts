import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UpdateSeat {
  @IsNumber()
  @IsOptional()
  size: number;
  @IsOptional()
  @IsBoolean()  
  isAvailable: boolean;
}
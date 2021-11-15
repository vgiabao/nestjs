import { IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class CreateSeatDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  size: number;
  @IsBoolean()
  @Expose() 
  isAvailable: boolean;
  @Exclude()
  id: number;
}

import { IsEmail, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @IsString()
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: number | 1;
}

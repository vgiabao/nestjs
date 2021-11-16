import { Expose, Exclude,  } from 'class-transformer';
import {IsOptional} from 'class-validator';

export class UpdateBookDtos {
  @Exclude()
  id: string;
  @Expose()
  @IsOptional()
  author: string;
  @Expose()
  title: string;
  @IsOptional()
  @Expose()
  roles: number;
  @Expose()
  @IsOptional()
  content: string;
  @Expose()
  @IsOptional()
  cover: string;
}
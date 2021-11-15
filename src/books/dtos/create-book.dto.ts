import { Expose, Exclude } from 'class-transformer';
import { Column } from 'typeorm';
export class CreateBookDto {
  @Exclude()
  id: string;
  @Expose()
  author: string;
  @Expose()
  title: string;
  @Expose()
  roles: number;
  @Expose()
  content: string;
  @Expose()
  cover: string;
}

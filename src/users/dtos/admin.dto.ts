import { Expose, Exclude } from 'class-transformer';
export class AdminDto {
  @Expose()
  id: number;
  //   @Expose()

  @Exclude()
  email: string;
  @Expose()
  password: string;
}

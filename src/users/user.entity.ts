import { IsBoolean, IsOptional } from 'class-validator';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  IsNull,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({unique: true,
    nullable: true})
  @Column()
  @IsBoolean()
  first: boolean
  @IsOptional()
  tokens: string | ""
  @AfterInsert()
  logInsert() {
    console.log('insert new user ', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('remove user ', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('Update user: ', this.id);
  }

}

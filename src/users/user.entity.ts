import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
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

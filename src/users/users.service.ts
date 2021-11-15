import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    //   just create an instance of user entity for hook to check the type
    const user = this.repo.create({ email, password });
    // save the user entity into the database
    return this.repo.save(user);
  }

  async getUser(id: number) {
    if (!id) return null;
    return await this.repo.findOne(id);
  }

  async findAll() {
    return await this.repo.find();
  }

  async getUserByEmail(email: string) {
    return await this.repo.find({ email });
  }

  async update(id: number, newProps: Partial<User>) {
    const user = await this.repo.findOne(id);
    if (!user) throw new NotFoundException('Not found');
    Object.assign(user, newProps);
    console.log('updated');
    return this.repo.save(user);
  }

  async remove(id: number) {
    // or we can use delete (1-trip option)
    const user = await this.repo.findOne(id);
    // throw error if the user is not found
    if (!user) throw new NotFoundException('not found');
    // remove the user
    await this.repo.remove(user);
    return 'remove sucessfully';
  }

  async findUserWithPasswordAndEmail(email: string, password: string) {
    const user = await this.repo.findOne({ email, password });
    if (!user) throw new NotFoundException('Not valid');
    return user;
  }
}

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Seat } from './seat.entity';

@Injectable()
export class SeatsService {
  constructor(@InjectRepository(Seat) private repo: Repository<Seat>) {}
  async addSeat(size: number) {
    const seat = this.repo.create({ size, isAvailable: true });
    await this.repo.save(seat);
    return seat;
  }
  async getAvailableSeats() {
    return await this.repo.find({ isAvailable: true });
  }
}

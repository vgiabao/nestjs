import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './history.entity';

@Injectable()
export class HistoryService {
  constructor(@InjectRepository(History) private repo: Repository<History>) {
  }
  async findHistory(id: number){
    return await  this.repo.findOne({id})
  }

  async createHistory(uid: number, bid: number, type: string){
    const history = this.repo.create({uid, bid, type})
    return await this.repo.save(history)
  }
  async removeFromHistory(id: number){
    const history = await this.findHistory(id)
    await  this.repo.remove(history)
    return `removed history ${id}`
  }
  async fetchUserReadHistory(uid: number, type: string){
    return await this.repo.find({ uid, type })
  }


}

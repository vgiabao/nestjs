import { Controller, Get, Post, Body } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CreateSeatDto } from './dtos/create-seat.dto';
@Controller('seats/')
export class SeatsController {
    constructor(private seatService: SeatsService){}
    @Serialize(CreateSeatDto)
    @Get('available')
    async getAvailableSeats(){
        return await this.seatService.getAvailableSeats()
    }
    @Post('/create')
    async createNewSeat(@Body() body){ 
        return await this.seatService.addSeat(body.size)
    }
    


}

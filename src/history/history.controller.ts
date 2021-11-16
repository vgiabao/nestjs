import { Controller, Request, Get, Body, Param, Delete } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UseGuards, Post } from '@nestjs/common';
import { JwtAuthGuard } from '../users/auth/jwt-auth.guard';
import { HistoryService } from './history.service';

@Controller('history')
@Roles('admin', 'user')
export class HistoryController {
  constructor(private historyService: HistoryService) {
  }

  @Get('/history/favourite')
  async fetchUserFavourite(@Request() req) {
    const uid = req.user.id;
    return await this.historyService.fetchUserReadHistory(uid, 'favourite');
  }

  @Get('/history/favourite')
  async fetchUserRead(@Request() req) {
    const uid = req.user.id;
    return await this.historyService.fetchUserReadHistory(uid, 'read');
  }

  @Get('/history/reading')
  async fetchUserReading(@Request() req) {
    const uid = req.user.id;
    return await this.historyService.fetchUserReadHistory(uid, 'reading');
  }

  @Post('/history/add/favourite/:id')
  async addToFavourite(@Request() req, @Param() param) {
    const uid = req.user.id;
    const bid = req.param.bid;
    return await this.historyService.createHistory(uid, bid, 'favourite');
  }

  @Post('history/add/read/:id')
  async addToRead(@Request() req, @Param() param) {
    const uid = req.user.id;
    const bid = req.param.bid;
    return await this.historyService.createHistory(uid, bid, 'read');
  }

  @Post('history/add/reading/:id')
  async addToReading(@Request() req, @Param() param) {
    const uid = req.user.id;
    const bid = req.param.bid;
    return await this.historyService.createHistory(uid, bid, 'reading');
  }

  @Delete('history/delete/:id')
  async removeFromHistory(@Param() param) {
    const id = param.id;
    return await this.historyService.removeFromHistory(id);
  }
}

import { Controller } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import {UseGuards, Post} from '@nestjs/common';

@Controller('history')
export class HistoryController {
  @Roles('admin', 'user')
  @Post('/history')
  fetchUserHistory(){

  }
}

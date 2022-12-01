import {
  Controller,
  Get,
  Res,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Response } from 'express-serve-static-core';

@Controller()
export class AppController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('/health')
  healthCheck(@Res() res: Response): any {
    if (this.connection.readyState === 1) {
      return res.status(HttpStatus.OK).send('OK');
    } else {
      throw new InternalServerErrorException();
    }
  }
}

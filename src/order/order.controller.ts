import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CancelOrderDTO } from './dto/cancal-order.dto';
import { CreateOrderDTO } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { Order } from './schemas/order.schemas';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ParamOrderIdDTO } from './dto/param-orderid.dto';

@ApiTags('order')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'success' })
  async findAllOrder(): Promise<Order[]> {
    return await this.orderService.findAllOrder();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({ status: 404, description: 'order not found' })
  async findById(@Param() paramOrderIdDTO: ParamOrderIdDTO): Promise<Order> {
    return await this.orderService.findOrderById(paramOrderIdDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({ status: 201, description: 'create success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createOrder(
    @Req() request: any,
    @Body() createProductDTO: CreateOrderDTO,
  ) {
    const { userId } = request.user;

    return await this.orderService.create(userId, createProductDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/cancel')
  @ApiResponse({ status: 201, description: 'create success' })
  @ApiResponse({ status: 404, description: 'order not found' })
  async cancelOrder(
    @Req() request: any,
    @Body() cancelOrderDTO: CancelOrderDTO,
  ) {
    const { userId } = request.user;

    return await this.orderService.cancelOrder(userId, cancelOrderDTO);
  }
}

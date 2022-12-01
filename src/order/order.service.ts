import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { CancelOrderDTO } from './dto/cancal-order.dto';
import { CreateOrderDTO } from './dto/create-order.dto';
import { ParamOrderIdDTO } from './dto/param-orderid.dto';
import { ORDER_REPOSITORY } from './repositories/order.repository.interface';
import { Order, Status } from './schemas/order.schemas';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository,
    private readonly productService: ProductService,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDTO): Promise<Order> {
    for (const orderProduct of createOrderDto.orderProduct) {
      const { productId, quantity } = orderProduct;

      const checkOutOfStock = await this.productService.checkOutOfStock(
        productId,
      );

      if (checkOutOfStock) {
        throw new BadRequestException(`product id:${productId} out of stock`);
      }

      await this.productService.decrementStock(productId, quantity);
    }

    createOrderDto.userId = userId;
    return await this.orderRepository.create(createOrderDto);
  }

  async findAllOrder(): Promise<Order[]> {
    return await this.orderRepository.findAll();
  }

  async findOrderById(paramOrderIdDTO: ParamOrderIdDTO): Promise<Order> {
    const order = await this.orderRepository.findById(paramOrderIdDTO.id);

    if (!order) {
      throw new NotFoundException(`order not found`);
    }

    return order;
  }

  async findOrderByUserId(userId: string): Promise<Order[]> {
    return await this.orderRepository.findByUserId(userId);
  }

  async cancelOrder(userId: string, cancelOrderDTO: CancelOrderDTO) {
    const { orderId, status } = cancelOrderDTO;

    const findObj = { status: { $ne: Status.Cancel }, _id: orderId, userId };
    const order = await this.orderRepository.findOne(findObj);

    console.log(order);

    if (!order) {
      throw new NotFoundException(`order not found`);
    }

    for (const orderProduct of order.orderProduct) {
      const { productId, quantity } = orderProduct;

      await this.productService.incrementStock(productId, quantity);
    }

    const updateOrder = await this.orderRepository.findOneAndUpDate(
      { _id: order._id },
      { status },
    );

    return updateOrder;
  }
}

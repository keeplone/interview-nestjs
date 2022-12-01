// import { CreateProductDTO } from '../dto/create-product.dto';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { Order } from '../schemas/order.schemas';

export const ORDER_REPOSITORY = 'orderRepository';

export interface IOrderRepository {
  create(createOrderDTO: CreateOrderDTO): Promise<Order>;
  findAll(): Promise<Order[]>;
  findByUserId(userId: string): Promise<Order[]>;
  findById(id: string): Promise<Order>;
  findOne(queryFilter: object): Promise<Order>;
  findOneAndUpDate(queryFilter: object, updateObj: object): Promise<Order>;
}

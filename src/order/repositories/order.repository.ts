import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../user/schemas/user.schemas';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { Order, OrderModel } from '../schemas/order.schemas';
import { IOrderRepository } from './order.repository.interface';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: OrderModel,
  ) {}

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderModel.find({}).populate('userId', 'email').lean();
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(createOrderDTO: CreateOrderDTO): Promise<Order> {
    try {
      return await this.orderModel.create(createOrderDTO);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByUserId(userId: string): Promise<Order[]> {
    try {
      return await this.orderModel.find({ userId }).lean();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<Order> {
    try {
      return await this.orderModel.findById(id).lean();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(queryFilter: object): Promise<Order> {
    try {
      return await this.orderModel.findOne(queryFilter).lean();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOneAndUpDate(
    queryFilter: object,
    updateObj: object,
  ): Promise<Order> {
    try {
      return await this.orderModel.findOneAndUpdate(queryFilter, updateObj, {
        new: true,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

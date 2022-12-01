import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateProductDTO } from '../dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IProductRepository } from './product.repository.interface';
import { Product, ProductModel } from '../schemas/product.schemas';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel(Product.name) private readonly productModel: ProductModel,
  ) {}

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    try {
      return await new this.productModel(createProductDTO).save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException({
          message: 'product name is duplicate',
        });
      }

      throw new Error(error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productModel.find().select('name quantity').lean();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<Product> {
    try {
      return await this.productModel.findById(id).lean();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateStockById(id: string, quantity: number) {
    try {
      return await this.productModel.findByIdAndUpdate(id, {
        $inc: { quantity: quantity },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

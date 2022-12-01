import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ParamProductIdDTO } from './dto/param-productid.dto';
import { PRODUCT_REPOSITORY } from './repositories/product.repository.interface';
import { Product } from './schemas/product.schemas';

@Injectable()
export class ProductService {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository) {}

  async createProduct(createProductDto: CreateProductDTO) {
    const newProduct = await this.productRepository.createProduct(
      createProductDto,
    );

    return newProduct;
  }

  async findAllProduct(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findProductById(
    getParamProductIdDTO: ParamProductIdDTO,
  ): Promise<Product> {
    const product = await this.productRepository.findById(
      getParamProductIdDTO.id,
    );

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return product;
  }

  async checkOutOfStock(id: string) {
    let outOfStock = false;
    const { quantity } = await this.productRepository.findById(id);

    if (quantity === 0) {
      outOfStock = true;
    }

    return outOfStock;
  }

  async decrementStock(id: string, quantity: number) {
    const negativeQuantity = quantity * -1;
    return await this.productRepository.updateStockById(id, negativeQuantity);
  }

  async incrementStock(id: string, quantity: number) {
    return await this.productRepository.updateStockById(id, quantity);
  }
}

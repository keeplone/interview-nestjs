import { CreateProductDTO } from '../dto/create-product.dto';
import { Product } from '../schemas/product.schemas';

export const PRODUCT_REPOSITORY = 'productRepository';

export interface IProductRepository {
  createProduct(createProductDTO: CreateProductDTO): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  updateStockById(id: string, quantity: number);
}

import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schemas';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParamProductIdDTO } from './dto/param-productid.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllProduct() {
    return await this.productService.findAllProduct();
  }

  @Get(':id')
  async findById(
    @Param() paramProductIdDTO: ParamProductIdDTO,
  ): Promise<Product> {
    return await this.productService.findProductById(paramProductIdDTO);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Body() createProductDTO: CreateProductDTO) {
    return await this.productService.createProduct(createProductDTO);
  }
}

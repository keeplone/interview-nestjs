import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNumber,
  ValidateNested,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderProduct {
  @ApiProperty()
  @IsMongoId()
  productId: string;

  @ApiProperty({ type: Number, minimum: 1 })
  @IsNumber()
  quantity: number;
}

export class CreateOrderDTO {
  userId: string;

  @ApiProperty({ type: [OrderProduct] })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  @ArrayUnique((orderProduct: OrderProduct) => orderProduct.productId, {
    message: 'productId must be unique',
  })
  orderProduct: OrderProduct[];
}

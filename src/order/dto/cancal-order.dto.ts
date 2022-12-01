import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsEnum } from 'class-validator';
import { Status } from '../schemas/order.schemas';

export class CancelOrderDTO {
  @ApiProperty()
  @IsMongoId()
  orderId: string;

  @ApiProperty({ enum: [Status.Cancel] })
  @IsEnum([Status.Cancel])
  status: Status;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class ParamOrderIdDTO {
  @ApiProperty()
  @IsMongoId()
  id: string;
}

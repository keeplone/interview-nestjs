import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class ParamProductIdDTO {
  @ApiProperty()
  @IsMongoId()
  id: string;
}

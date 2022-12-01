import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schemas';
import { OrderProduct, OrderProductSchema } from './order-product.schemas';

export type OrderDocument = mongoose.HydratedDocument<Order>;

export enum Status {
  Pending = 'Pending',
  Cancel = 'Cancel',
  Success = 'Success',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop([{ type: OrderProductSchema }])
  orderProduct: OrderProduct[];

  @Prop({
    type: String,
    required: true,
    enum: [Status.Pending, Status.Cancel, Status.Success],
    default: Status.Pending,
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export type OrderModel = mongoose.Model<OrderDocument>;

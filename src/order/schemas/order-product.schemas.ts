import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from '../../product/schemas/product.schemas';

export type OrderProductDocument = mongoose.HydratedDocument<OrderProduct>;

@Schema({ _id: false, timestamps: true })
export class OrderProduct {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Product.name,
    required: true,
  })
  productId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  quantity: number;
}

export const OrderProductSchema = SchemaFactory.createForClass(OrderProduct);

export type OrderProductModel = mongoose.Model<OrderProductDocument>;

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ type: Number, required: true, min: 0, default: 0 })
  quantity: number;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updateAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export type ProductModel = Model<ProductDocument>;

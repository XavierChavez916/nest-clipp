import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Badge extends Document {
  @Prop({ unique: true, required: true })
  titulo: string;

  @Prop({ unique: true, required: true })
  descripcion: string;

  @Prop({ default: 0 })
  score: number;
  @Prop({ unique: true, required: true })
  no: number;

  @Prop({ unique: true, required: true })
  url: string;

  
}

export const BadgeSchema = SchemaFactory.createForClass(Badge);

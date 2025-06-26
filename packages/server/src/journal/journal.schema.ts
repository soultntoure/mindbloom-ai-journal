import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../users/users.schema';

export type JournalDocument = Journal & Document;

@Schema({ timestamps: true })
export class Journal {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  mood: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const JournalSchema = SchemaFactory.createForClass(Journal);

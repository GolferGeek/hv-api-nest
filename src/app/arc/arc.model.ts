// thought.model.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../user/user.model';
import { Refutation } from './refutation/refutation.model';

export type ArcDocument = Arc & Document;

@ObjectType()
@Schema()
export class Arc {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field(() => String, { nullable: true })
  @Prop({ default: null })
  source: MongooseSchema.Types.ObjectId;

  @Field({ nullable: true })
  @Prop({ default: null })
  elevator: string;

  @Field()
  @Prop({ required: true })
  markdown: string;

  @Field()
  @Prop()
  sequence: number;

  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: MongooseSchema.Types.ObjectId;

  @Field(() => [String], { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  collaborators: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  viewers: MongooseSchema.Types.ObjectId[];

  @Field(() => [String])
  @Prop({ type: [{ type: String }] })
  tags: string;

  @Field()
  @Prop({ default: new Date().toISOString() })
  publishedDate: string;

  @Field(() => [String], { nullable: true })
  @Prop([{ type: MongooseSchema.ObjectId, ref: 'Comment' }])
  comments: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: true })
  @Prop([{ type: MongooseSchema.ObjectId, ref: 'Refutation' }])
  refutations: MongooseSchema.Types.ObjectId[];

  @Field(() => [Arc], { nullable: true })
  @Prop([{ type: MongooseSchema.ObjectId, ref: 'Arc' }])
  children: MongooseSchema.Types.ObjectId[] | Arc[];

  @Field(() => String, { nullable: true })
  @Prop({ type: MongooseSchema.ObjectId, ref: 'Arc' })
  parent: MongooseSchema.Types.ObjectId;
}

export const ArcSchema = SchemaFactory.createForClass(Arc);

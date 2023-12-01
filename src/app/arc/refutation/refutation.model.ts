// thought.model.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RefutationDocument = Refutation & Document;

@ObjectType()
@Schema()
export class Refutation {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Arc' })
  arc: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  title: string;

  @Field(() => String, { nullable: true })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'SourceLink',
    default: null,
  })
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
  owner: MongooseSchema;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  collaborators: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
  viewers: MongooseSchema.Types.ObjectId[];

  @Field(() => [String])
  @Prop()
  tags: string[];

  @Field(() => String)
  @Prop({ defaultValue: new Date().toISOString() })
  publishedDate: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Comment' })
  comments: MongooseSchema.Types.ObjectId[];

  @Field(() => [Refutation], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Refutation' })
  children: MongooseSchema.Types.ObjectId[] | Refutation[];

  @Field(() => String, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Refutation' })
  parent: MongooseSchema.Types.ObjectId;
}

export const RefutationSchema = SchemaFactory.createForClass(Refutation);

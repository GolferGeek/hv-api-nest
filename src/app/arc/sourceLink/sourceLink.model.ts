// thought.model.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/app/user/user.model';
import { Arc } from '../arc.model';
import { Refutation } from '../refutation/refutation.model';

export type SourceLinkDocument = SourceLink & Document;

@ObjectType()
@Schema()
export class SourceLink {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field(() => String, { nullable: true })
  @Prop({ default: null })
  uri: string;

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
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  owner: MongooseSchema.Types.ObjectId;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: User.name })
  collaborators: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: User.name })
  viewers: MongooseSchema.Types.ObjectId[];

  @Field(() => [String])
  @Prop()
  tags: string[];

  @Field(() => String)
  @Prop({ default: new Date().toISOString() })
  publishedDate: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Arc.name })
  arcs: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Refutation.name })
  refutations: MongooseSchema.Types.ObjectId[];
}

export const SourceLinkSchema = SchemaFactory.createForClass(SourceLink);

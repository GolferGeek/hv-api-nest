// user.model.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Arc } from '../arc/arc.model';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  auth0Id: string;

  @Field()
  @Prop({ required: true })
  username: string;

  @Field()
  @Prop({ required: true })
  email: string;

  @Field({ nullable: true })
  @Prop({ required: false })
  imageUrl: string;

  @Field({ nullable: true })
  @Prop()
  bio: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Arc.name })
  arcs: MongooseSchema.Types.ObjectId[];

  @Field()
  @Prop({ default: false })
  isAdmin: boolean;

  @Field(() => [String], { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Arc.name })
  favorites: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Arc.name })
  recents: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Arc.name })
  pinned: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Arc.name })
  bookmarks: MongooseSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

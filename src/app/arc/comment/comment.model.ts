// comment.model.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Arc } from '../arc.model';
import { User } from 'src/app/user/user.model';

export type CommentDocument = Comment & Document;

@ObjectType()
@Schema()
export class Comment {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Arc.name })
  arc: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  markdown: string;

  @Field(() => String)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  owner: MongooseSchema.Types.ObjectId;

  @Field()
  @Prop({ default: new Date().toISOString() })
  publishedDate: string;

  @Field(() => [Comment], { nullable: true })
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: Comment.name })
  children: MongooseSchema.Types.ObjectId[];

  @Field(() => String, { nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Comment.name })
  parent: MongooseSchema.Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

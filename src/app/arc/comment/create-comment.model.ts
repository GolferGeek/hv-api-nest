import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  markdown: string;

  @Field(() => String)
  owner: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  parent: MongooseSchema.Types.ObjectId;
}

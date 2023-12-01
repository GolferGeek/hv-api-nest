import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateRefutationInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  elevator: string;

  @Field(() => String)
  markdown: string;

  @Field(() => Number)
  sequence: number;

  @Field(() => String)
  owner: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  parent: MongooseSchema.Types.ObjectId;

  @Field(() => [String])
  tags: string;

  @Field(() => Date, { defaultValue: new Date() })
  publishedDate: Date;
}

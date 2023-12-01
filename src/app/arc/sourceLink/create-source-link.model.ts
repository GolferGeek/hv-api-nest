import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateSourceLinkInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  uri: string;

  @Field(() => String)
  markdown: string;

  @Field(() => String, { nullable: true })
  owner: MongooseSchema.Types.ObjectId;

  @Field(() => [String])
  tags: string[];

  @Field(() => Date, { defaultValue: new Date() })
  publishedDate: Date;
}

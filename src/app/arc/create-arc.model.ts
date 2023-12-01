import { Field, InputType } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateArcInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  elevator: string;

  @Field(() => String)
  markdown: string;

  @Field(() => Number, { defaultValue: 0 })
  sequence: number;

  @Field(() => String)
  owner: MongooseSchema.Types.ObjectId;

  @Field(() => [String], { nullable: true })
  collaborators: MongooseSchema.Types.ObjectId[];

  @Field(() => [String], { nullable: true })
  tags: [string];

  @Field(() => String, { nullable: true })
  parent: MongooseSchema.Types.ObjectId;
}

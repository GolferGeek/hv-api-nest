import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import * as joi from 'joi';
import { join } from 'path';
import { ArcModule } from './arc/arc.module';
import { UserModule } from './user/user.module';
import { NestAuthorizationModule } from './libs/authorization/nest-authorization.module';
import { NestMongooseModule } from './libs/mongoose/nest-mongoose.module';
import { LoggerModule } from './libs/logging/nest-logging.module';
import { SourceLinkSchema } from './arc/sourceLink/sourceLink.model';
import { ArcSchema } from './arc/arc.model';
import { UserSchema } from './user/user.model';
import { RefutationSchema } from './arc/refutation/refutation.model';
import { CommentSchema } from './arc/comment/comment.model';

@Module({
  imports: [
    NestAuthorizationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        AUTH0_AUDIENCE: joi.string().required(),
        AUTH0_DOMAIN: joi.string().required(),
        PORT: joi.number().default(3000),
        DEBUG: joi.boolean().default(false),
        MONGODB_URI: joi.string().required(),
      }),
    }),
    LoggerModule,
    NestAuthorizationModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      installSubscriptionHandlers: true,
      sortSchema: true,
      playground: true,
      driver: ApolloDriver,
    }),
    NestMongooseModule,
    NestMongooseModule.forFeature([
      { name: 'SourceLink', schema: SourceLinkSchema },
      { name: 'Arc', schema: ArcSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'Refutation', schema: RefutationSchema },
    ]),
    ArcModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

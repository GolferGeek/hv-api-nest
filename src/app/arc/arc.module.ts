import { Module } from '@nestjs/common';

import { ArcResolver } from './arc.resolver';
import { ArcService } from './arc.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Arc, ArcSchema } from './arc.model';
import { CommentService } from './comment/comment.service';
import { CommentResolver } from './comment/comment.resolver';
import { RefutationService } from './refutation/refutation.service';
import { Refutation, RefutationSchema } from './refutation/refutation.model';
import { RefutationResolver } from './refutation/refutation.resolver';
import { SourceLinkService } from './sourceLink/sourceLink.service';
import { SourceLinkResolver } from './sourceLink/sourceLink.resolver';
import { SourceLink, SourceLinkSchema } from './sourceLink/sourceLink.model';
import { Comment, CommentSchema } from './comment/comment.model';
import { DeleteService } from './delete.service';
import { UserModule } from '../user/user.module';
@Module({
  providers: [
    ArcService,
    ArcResolver,
    CommentService,
    CommentResolver,
    RefutationService,
    RefutationResolver,
    SourceLinkService,
    SourceLinkResolver,
    DeleteService,
  ],
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: Arc.name,
        schema: ArcSchema,
      },
      {
        name: Refutation.name,
        schema: RefutationSchema,
      },
      {
        name: SourceLink.name,
        schema: SourceLinkSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
})
export class ArcModule {}

import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Comment, CommentDocument } from './comment.model';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './create-comment.model';
import { DeleteService } from '../delete.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/app/libs/authorization/authorization.guard';

@Resolver(() => Comment)
// @UseGuards(AuthorizationGuard)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly deleteService: DeleteService,
  ) {}

  @Query(() => [Comment])
  async comments(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Query(() => Comment)
  async comment(@Args('id', { type: () => ID }) id: string): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @Mutation(() => Comment)
  async createComment(
    @Args('input') input: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentService.createComment(input);
  }

  @Mutation(() => Comment)
  async updateComment(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: CreateCommentInput,
  ): Promise<Comment> {
    return this.commentService.updateComment(id, input);
  }

  @Mutation(() => Comment)
  async deleteComment(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<void> {
    await this.deleteService.deleteComment(id);
  }

  @ResolveField()
  async children(@Parent() parent: CommentDocument) {
    await parent.populate({ path: 'children', model: 'Comment' });
    return parent.children;
  }
}

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SourceLink } from './sourceLink.model';
import { SourceLinkService } from './sourceLink.service';
import { CreateSourceLinkInput } from './create-source-link.model';
import { DeleteService } from '../delete.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/app/libs/authorization/authorization.guard';

@Resolver(() => SourceLink)
// @UseGuards(AuthorizationGuard)
export class SourceLinkResolver {
  constructor(
    private readonly sourceLinkService: SourceLinkService,
    private readonly deleteService: DeleteService,
  ) {}

  @Query(() => [SourceLink])
  async sourceLinks(): Promise<SourceLink[]> {
    return this.sourceLinkService.findAll();
  }

  @Query(() => SourceLink)
  async sourceLink(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<SourceLink> {
    return this.sourceLinkService.findOne(id);
  }

  @Mutation(() => SourceLink)
  async createSourceLink(
    @Args('input') input: CreateSourceLinkInput,
  ): Promise<SourceLink> {
    return this.sourceLinkService.createSourceLink(input);
  }

  @Mutation(() => SourceLink)
  async updateSourceLink(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: CreateSourceLinkInput,
  ): Promise<SourceLink> {
    return this.sourceLinkService.updateSourceLink(id, input);
  }

  @Mutation(() => SourceLink)
  async deleteSourceLink(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<void> {
    await this.deleteService.deleteSourceLink(id);
  }
}

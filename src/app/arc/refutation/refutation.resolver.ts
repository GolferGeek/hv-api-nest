import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Refutation, RefutationDocument } from './refutation.model';
import { RefutationService } from './refutation.service';
import { CreateRefutationInput } from './create-refutation.model';
import { DeleteService } from '../delete.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/app/libs/authorization/authorization.guard';

@Resolver(() => Refutation)
// @UseGuards(AuthorizationGuard)
export class RefutationResolver {
  constructor(
    private readonly refutationService: RefutationService,
    private readonly deleteService: DeleteService,
  ) {}

  @Query(() => [Refutation])
  async refutations(): Promise<Refutation[]> {
    return this.refutationService.findAll();
  }

  @Query(() => Refutation)
  async refutation(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Refutation> {
    return this.refutationService.findOne(id);
  }

  @Mutation(() => Refutation)
  async createRefutation(
    @Args('input') input: CreateRefutationInput,
  ): Promise<Refutation> {
    return this.refutationService.createRefutation(input);
  }

  @Mutation(() => Refutation)
  async updateRefutation(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: CreateRefutationInput,
  ): Promise<Refutation> {
    return this.refutationService.updateRefutation(id, input);
  }

  @Mutation(() => Refutation)
  async deleteRefutation(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<void> {
    await this.deleteService.deleteRefutation(id);
  }

  @ResolveField()
  async children(@Parent() parent: RefutationDocument) {
    await parent.populate({ path: 'children', model: 'Refutation' });
    return parent.children;
  }
}

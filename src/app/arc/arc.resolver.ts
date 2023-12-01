import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Arc, ArcDocument } from './arc.model';
import { ArcService } from './arc.service';
import { CreateArcInput } from './create-arc.model';
import { UseGuards } from '@nestjs/common';
import { DeleteService } from './delete.service';
import { AuthorizationGuard } from '../libs/authorization/authorization.guard';

@Resolver(() => Arc)
// @UseGuards(AuthorizationGuard)
export class ArcResolver {
  constructor(
    private readonly arcService: ArcService,
    private readonly deleteService: DeleteService,
  ) {}

  @Query(() => [Arc])
  async arcs(): Promise<Arc[]> {
    return this.arcService.findAll();
  }

  @Query(() => Arc)
  async arc(@Args('id', { type: () => ID }) id: string): Promise<Arc> {
    return this.arcService.findOne(id);
  }

  @Mutation(() => Arc)
  async createArc(@Args('input') input: CreateArcInput): Promise<Arc> {
    return this.arcService.createArc(input);
  }

  @Mutation(() => Arc)
  async updateArc(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: CreateArcInput,
  ): Promise<Arc> {
    return this.arcService.updateArc(id, input);
  }

  @Mutation(() => Arc)
  async deleteArc(@Args('id', { type: () => ID }) id: string): Promise<void> {
    await this.deleteService.deleteArc(id);
  }

  @ResolveField()
  async children(@Parent() parent: ArcDocument) {
    await parent.populate({ path: 'children', model: 'Arc' });
    return parent.children;
  }
}

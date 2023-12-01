import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { CreateUserInput } from './create-user.model';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../libs/authorization/authorization.guard';

@Resolver('User')
// @UseGuards(AuthorizationGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('_id') _id: string) {
    return this.userService.findOne(_id);
  }

  @Query(() => User)
  async userByAuth0Id(@Args('auth0Id') auth0Id: string) {
    return this.userService.findOne(auth0Id);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('_id') _id: string,
    @Args('input') input: CreateUserInput,
  ) {
    return this.userService.update(_id, input);
  }

  @Mutation(() => User)
  async deleteUser(@Args('_id') _id: string) {
    return this.userService.remove(_id);
  }
}

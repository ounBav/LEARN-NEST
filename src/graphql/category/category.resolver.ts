import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Category } from './Category.model';
import { CategoryService } from './category.service';
import { CreateCategoryInput, updateCategoryInput } from './category.input';
import { CurrentUser } from 'src/common/graphql-helper/current_user.helper';
import { UserEntity } from 'src/entities';
import { Auth } from 'src/common/decorator/gql-auth-decorator';

@Resolver('category')
export class CategoryResolver {
  constructor(private readonly service: CategoryService) {}
  //=======================
  //QUERY
  //=======================

  @Auth('ADMIN')
  @Query(() => [Category])
  async getCategories() {
    return this.service.getCategories();
  }

  @Auth('ADMIN')
  @Query(() => [Category])
  async getCategory(@Args('id') id: number) {
    return this.service.getCategory(id);
  }

  //=======================
  //MUTATION
  //=======================
  @Auth('ADMIN')
  @Mutation(() => Category)
  async createCategory(
    @CurrentUser() user: UserEntity,
    @Args('input') input: CreateCategoryInput,
  ) {
    return this.service.createCategory(user, input);
  }

  @Auth('ADMIN')
  @Mutation(() => Category)
  async updateCategory(
    @CurrentUser() user: UserEntity,
    @Args('input') input: updateCategoryInput,
  ) {
    return this.service.updateCategory(user, input);
  }

  @Auth('ADMIN')
  @Mutation(() => Category)
  async deleteCategory(@Args('id') id: number) {
    return this.service.deleteCategory(id);
  }
}

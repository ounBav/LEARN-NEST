import { BadRequestException, Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity, UserEntity } from 'src/entities';
import { Not, Repository } from 'typeorm';
import { CreateCategoryInput, updateCategoryInput } from './category.input';
import { EntityStatus } from 'src/common/types/enum';

@Controller('category')
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  /**************************
   * QUERY
   *************************/

  async getCategories() {
    return this.categoryRepo.find();
  }

  async getCategory(id: number) {
    return this.validateCategory(id);
  }

  /**********************
   * MUTATION
   *********************/

  async createCategory(
    { id: createdBy }: UserEntity,
    CreateCategoryInput: CreateCategoryInput,
  ) {
    const cat = await this.categoryRepo.findOne({
      where: { name: CreateCategoryInput.name, status: EntityStatus.ACTIVE },
    });
    console.log(cat);
    if (cat) throw new BadRequestException('this category is already existed.');

    return await this.categoryRepo.save({
      ...CreateCategoryInput,
      createdBy,
    });
  }

  async updateCategory(
    { id: updatedBy }: UserEntity,
    updateCategoryInput: updateCategoryInput,
  ) {
    this.validateCategory(updateCategoryInput.id);
    const cat = this.categoryRepo.findOne({
      where: {
        id: Not(updateCategoryInput.id),
        status: EntityStatus.ACTIVE,
        name: updateCategoryInput.name,
      },
    });

    if (cat) throw new BadRequestException('this category is already existed.');
    return await this.categoryRepo.save({
      ...updateCategoryInput,
      updatedBy,
    });
  }
  async deleteCategory(id: number) {
    const cat = this.validateCategory(id);
    if (cat)
      await this.categoryRepo.update(id, { status: EntityStatus.DELETE });
    return true;
  }

  //=====================
  //PRIVATE FUNCTION
  //=====================

  async validateCategory(id: number) {
    const cat = this.categoryRepo.findBy({
      id,
      status: Not(EntityStatus.DELETE),
    });
    if (!cat) throw new BadRequestException('Category not found.');
    return cat;
  }
}

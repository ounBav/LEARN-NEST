import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityStatus } from 'src/common/types/enum';
import { ProductEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { createProductInput, updateProductInput } from './product.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly ProdRepo: Repository<ProductEntity>,
  ) {}
  //=====================================================
  // QUERY
  //=====================================================
  async findProducts() {
    return await this.ProdRepo.find();
  }

  async findProduct(id: string) {
    return await this.validateProduct(id);
  }
  //=====================================================
  // MUTATION
  //=====================================================
  async createProduct(
    id: string,
    input: createProductInput,
    file: Express.Multer.File,
  ) {
    console.log(file);
    return this.ProdRepo.save({ ...input, createdBy: id, updatedBy: id });
  }

  async updateProduct(id: string, input: updateProductInput) {
    this.validateProduct(input.id);
    return this.ProdRepo.save({ ...input, updatedBy: id });
  }

  async RemoveProd(id: string) {
    this.validateProduct(id);
    await this.ProdRepo.update(id, { status: EntityStatus.DELETE });
    return true;
  }
  //=====================================================
  // PRIVATE FUNCTION
  //=====================================================
  async validateProduct(id: string) {
    const prod = await this.ProdRepo.findOne({
      where: { id, status: EntityStatus.ACTIVE },
    });
    if (!prod) throw new BadRequestException('Product not found,');
    return prod;
  }
}

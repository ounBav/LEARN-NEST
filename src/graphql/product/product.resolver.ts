import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { createProductInput, updateProductInput } from './product.input';
import { CurrentUser } from 'src/common/graphql-helper/current_user.helper';
import { UserEntity } from 'src/entities';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageMulterOption } from 'src/common/interceptors/multer_intercepter';

@Resolver()
export class ProductResolver {
  constructor(private readonly prodService: ProductService) {}
  //===========================
  //QUERY
  //===========================
  @Query(() => [Product]!)
  getProducts() {
    return this.prodService.findProducts();
  }

  @Query(() => Product!)
  getProductBuyId(@Args('id') id: string) {
    return this.prodService.findProduct(id);
  }
  //===========================
  //MUTATION
  //===========================
  @Mutation(() => Product!)
  @UseInterceptors(FileInterceptor('image', ImageMulterOption))
  createProduct(
    @Args('product') product: createProductInput,
    @CurrentUser() { id }: UserEntity,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.prodService.createProduct(id, product, file);
  }

  @Mutation(() => Product!)
  updateProduct(
    @Args('product') product: updateProductInput,
    @CurrentUser() { id }: UserEntity,
  ) {
    this.prodService.updateProduct(id, product);
  }

  @Mutation(() => Boolean)
  removeProduct(@Args('id') id: string) {
    this.prodService.RemoveProd(id);
  }
}

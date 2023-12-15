import { Module } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CategoryResolver, CategoryService, JwtService],
})
export class CategoryModule {}

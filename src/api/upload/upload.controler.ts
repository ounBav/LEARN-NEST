/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Req,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ImageMulterOption } from 'src/common/interceptors/multer_intercepter';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Get('images')
  getAllPicture() {
    return this.uploadService.getImages();
  }

  @Post('/image')
  @UseInterceptors(FileInterceptor('image', ImageMulterOption))
  uploadProfile(@Req() req, @UploadedFile() file: Express.Multer.File) {
    file;
    if (!file) {
      throw new BadRequestException('No files uploaded');
    }

    return this.uploadService.uploadImage(file);
  }
}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import { resolve } from 'path';
import { ImageEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  private readonly storage: admin.storage.Storage;
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepo: Repository<ImageEntity>,
  ) {
    this.storage = admin.storage();
  }
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const fileBuffer = fs.readFileSync(file.path);
    console.log(fileBuffer);
    const { originalname } = file;
    const bucket = this.storage.bucket();
    const fileBlob = bucket.file(originalname.replace(/ /g, '_'));

    const blobStream = fileBlob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      throw new Error(`Unable to upload image: ${error}`);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileBlob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(fileBuffer);
    // Get the public URL of the uploaded file
    const [url] = await fileBlob.getSignedUrl({
      action: 'read',
      expires: '01-01-2500', // Adjust the expiration date as needed
    });

    //Save to Database
    const image = new ImageEntity();
    image.name = url;
    this.imageRepo.save(image);
    return url;
  }

  async getImages() {
    return this.imageRepo.find();
  }
}

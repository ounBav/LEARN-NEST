/* eslint-disable prettier/prettier */
import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';
import * as fs from 'fs';
import * as mime from 'mime-types';
import * as multer from 'multer';
import * as path from 'path';
import * as shell from 'shelljs';
import * as uuid from 'uuid';

const destination = path.resolve('.', 'public', 'upload');

export const ImageMulterOption: MulterOptions = {
  limits: {
    files: 100, // max number of files
    fileSize: 15 * 1024 * 1024, // 15 mb
  },
  storage: multer.diskStorage({
    // filename: (req, file, cb) => cb(null, file.originalname),
    filename: (req, file, cb) =>
      cb(
        null,
        `${uuid.v4().replace(/-/g, '')}${path.extname(file.originalname)}`,
      ), // mime.extension(file.mimetype)
    destination: (req, file, cb) => cb(null, destination),
  }),
  fileFilter: (req: Request, file, cb) => {
    if (!fs.existsSync(destination)) shell.mkdir('-p', destination);

    // TODO: check if upload is required parameters
    if (req.params.id === 'test') {
      return cb(new BadRequestException('Incorrect Client Key'), false);
    }

    // Check allowed extensions
    const allowedExtensions: any[] = ['jpg', 'jpeg', 'png'];
    if (!allowedExtensions.includes(mime.extension(file.mimetype))) {
      return cb(new BadRequestException('Extension not allowed'), false);
    }
    return cb(null, true);
  },
};

/* eslint-disable prettier/prettier */
import { IsNotEmptyEnum } from 'src/common';
import { UploadTypeEnum } from 'src/common/types/enum';

export class UploadQuery {
  @IsNotEmptyEnum(UploadTypeEnum)
  type!: UploadTypeEnum;
}

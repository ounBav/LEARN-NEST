import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TelegramApiConfig {
  @IsNotEmpty()
  @IsString()
  API_HASH!: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform((x) => +x.value)
  API_ID!: number;

  @IsString()
  STRING_SESSION!: string;
}

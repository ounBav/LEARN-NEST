import { Inject } from '@nestjs/common';
import { TELEGRAM_API_TOKEN } from './telegram.constant';

export const InjectTelegramApiService = () => Inject(TELEGRAM_API_TOKEN);

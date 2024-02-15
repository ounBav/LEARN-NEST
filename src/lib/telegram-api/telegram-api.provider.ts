import { Provider } from '@nestjs/common';
import { TELEGRAM_API_TOKEN } from './telegram.constant';
import { StringSession } from 'telegram/sessions';
import { TelegramClient } from 'telegram';
import { ConfigService } from '@lib/configs';
import { TelegramApiConfig } from './telegram-api.dto';
import { TelegramApiService } from './telegram-api.service';
import * as I from 'input';

export const TelegramApiProvider: Provider = {
  inject: [ConfigService],
  provide: TELEGRAM_API_TOKEN,
  useFactory: async (configService: ConfigService) => {
    const config = configService.validate(
      'TelegramApiModule',
      TelegramApiConfig,
    );

    const session = new StringSession(config.STRING_SESSION);
    const client = new TelegramClient(session, config.API_ID, config.API_HASH, {
      connectionRetries: 5,
    });

    await client.start({
      phoneNumber: async () => await I.text('number ?'),
      password: async () => await I.text('password?'),
      phoneCode: async () => await I.text('Code ?'),
      onError: (err) => console.log(err),
    });

    await client.connect().then(async () => {
      const isAuth = await client.checkAuthorization();
      if (isAuth) console.log(`Telegram client connected ${isAuth}.`);
    });
    client.session.save();

    return new TelegramApiService(client);
  },
};

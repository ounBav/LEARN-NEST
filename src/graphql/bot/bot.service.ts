import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as TelegramBotApi from 'node-telegram-bot-api';
import { TelegramEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { BotCreatePollVoteInput, BotMessageInput } from './bot_message.input';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: TelegramBotApi;
  constructor(
    @InjectRepository(TelegramEntity)
    private readonly repo: Repository<TelegramEntity>,
  ) {
    this.bot = new TelegramBotApi(
      '6923200818:AAGl7SeDMKCLk6l7iK2bYy8n7GyWpA-BaOw',
      { polling: true },
    );
  }
  onModuleInit() {
    this.botMessage();
  }
  botMessage() {
    this.bot.on('message', async (msg) => {
      const Hi = 'hi';
      const { id, is_bot, first_name, last_name, username } = msg.from;
      const chat = await this.repo.findOne({ where: { chat_id: id } });
      if (!chat) {
        await this.repo.save({
          chat_id: id,
          is_bot: is_bot,
          first_name: first_name,
          last_name: last_name,
          username: username,
        });
      }
      if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        this.bot.sendMessage(
          msg.from.id,
          'Hello ' + msg.from.first_name + ' I love you.',
        );
      }
    });
    return true;
  }

  async botSendMessage(input: BotMessageInput) {
    const chats = await this.repo.find();
    chats.forEach(async (chat) => {
      await this.bot.sendMessage(chat.chat_id, input.message);
    });
    return true;
  }

  async botSendPollVote(poll: BotCreatePollVoteInput) {
    const chats = await this.repo.find();
    chats.forEach(async (chat) => {
      await this.bot.sendPoll(chat.chat_id, poll.question, poll.options, {
        is_anonymous: false,
      });
    });
    return true;
  }
}

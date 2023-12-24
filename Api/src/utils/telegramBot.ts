import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import {processUpdateStats} from '../cronjob/Action';
import {InkWhaleDbDataSource} from '../datasources';
import {
  LpPoolsSchemaRepository,
  NftPoolsSchemaRepository,
  PoolsSchemaRepository,
  StatsSchemaRepository,
} from '../repositories';
import {formatNumDynDecimal, send_telegram_message} from './utils';

dotenv.config();

if (process.env.RUN_TELEGRAM_BOT == 'true') {
  const bot = new TelegramBot(
    process.env.TELEGRAM_BOT_TOKEN ||
      '6827028829:AAHcGziBmjhyR8xdDqAj4h0sbLg1wfKFuTg',
    {
      polling: true,
    },
  );
  console.log(process.env.TELEGRAM_ID_CHAT);

  bot.on('message', msg => {
    (async () => {
      const chatId = msg?.chat?.id || '';
      const threadId = msg?.message_thread_id?.toString() || '';
      const messageText = msg?.text?.toLowerCase() || '';

      if (chatId == process.env.TELEGRAM_ID_CHAT) {
        switch (messageText) {
          case '/tvl':
            (async () => {
              const poolsRepo = new PoolsSchemaRepository(
                new InkWhaleDbDataSource(),
              );
              const nftPoolsRepo = new NftPoolsSchemaRepository(
                new InkWhaleDbDataSource(),
              );
              const statsRepo = new StatsSchemaRepository(
                new InkWhaleDbDataSource(),
              );
              const lppoolRepo = new LpPoolsSchemaRepository(
                new InkWhaleDbDataSource(),
              );

              const statsList = await statsRepo.find();
              if (statsList?.length > 0) {
                send_telegram_message(
                  `<b>Platform TVL:</b> <b><i>${formatNumDynDecimal(
                    parseFloat(statsList[0]?.tvlInAzero || ''),
                  )}</i></b> AZERO ($ <b>${formatNumDynDecimal(
                    parseFloat(statsList[0]?.tvlInUSD || ''),
                  )}</b>)`,
                  process.env.TELEGRAM_ID_CHAT || '',
                  threadId,
                );
              } else {
                const TVLData = await processUpdateStats(
                  statsRepo,
                  poolsRepo,
                  nftPoolsRepo,
                  lppoolRepo,
                );
                send_telegram_message(
                  `<b>Platform TVL:</b> <b><i>${formatNumDynDecimal(
                    parseFloat(TVLData?.tvlInAzero || ''),
                  )}</i></b> AZERO ($ <b>${formatNumDynDecimal(
                    parseFloat(TVLData?.tvlInUSD || ''),
                  )}</b>)`,
                  process.env.TELEGRAM_ID_CHAT || '',
                  threadId,
                );
              }
            })();
        }
      }
    })();
  });
} else {
  console.log(
    'Bot is not running. Set RUN_TELEGRAM_BOT=true to start the bot.',
  );
}

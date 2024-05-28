import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import {processUpdateStats} from '../../cronjob/Action';
import {InkWhaleDbDataSource} from '../../datasources';
import {
  LpPoolsSchemaRepository,
  NftPoolsSchemaRepository,
  PoolsSchemaRepository,
  StatsSchemaRepository,
} from '../../repositories';
import {formatNumDynDecimal, send_telegram_message} from '../utils';
dotenv.config();

if (process.env.RUN_TELEGRAM_BOT == 'true') {
  const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || '', {
    polling: true,
  });
  if (bot) console.log('TELEGRAM BOT FEED: Listening');
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
                  `<b>Platform TVL: <i>${formatNumDynDecimal(
                    parseFloat(statsList[0]?.tvlInAzero || ''),
                    4,
                  )}</i> AZE RO 123 ($${formatNumDynDecimal(
                    parseFloat(statsList[0]?.tvlInUSD || ''),
                    4,
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
                  `<b>Platform TVL: <i>${formatNumDynDecimal(
                    parseFloat(TVLData?.tvlInAzero || ''),
                    4,
                  )}</i> AZERO ($${formatNumDynDecimal(
                    parseFloat(TVLData?.tvlInUSD || ''),
                    4,
                  )}</b>)`,
                  process.env.TELEGRAM_ID_CHAT || '',
                  threadId,
                );
              }
            })();
            break;
          case '/price':
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
                const {azeroInUSD, inw2InAzero} = statsList[0];

                const inw2InUSD = Number(azeroInUSD) * Number(inw2InAzero || 0);

                send_telegram_message(
                  `<b>INW2 Price: <i>${formatNumDynDecimal(
                    inw2InAzero,
                    4,
                  )}</i> AZERO ($${formatNumDynDecimal(inw2InUSD, 6)}</b>)`,
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

                const inw2InUSD =
                  Number(TVLData?.azeroInUSD) *
                  Number(TVLData?.inw2InAzero || 0);

                send_telegram_message(
                  `<b>INW2 Price: <i>${formatNumDynDecimal(
                    TVLData?.inw2InAzero,
                    4,
                  )}</i> AZERO ($${formatNumDynDecimal(inw2InUSD, 6)}</b>)`,
                  process.env.TELEGRAM_ID_CHAT || '',
                  threadId,
                );
              }
            })();
            break;
          case '/testdd':
            console.log(':dasd');
            break;
        }
      }
    })();
  });
} else {
  console.log(
    'Bot is not running. Set RUN_TELEGRAM_BOT=true to start the bot.',
  );
}

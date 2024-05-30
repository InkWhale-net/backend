import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import {fetchInwPrice, processUpdateStats} from '../../cronjob/Action';
import {InkWhaleDbDataSource} from '../../datasources';
import {
  LpPoolsSchemaRepository,
  NftPoolsSchemaRepository,
  PoolsSchemaRepository,
  StatsSchemaRepository,
} from '../../repositories';
import {
  formatNumDynDecimal,
  getAzeroPrice,
  send_telegram_message,
} from '../utils';
import {globalApi} from '../..';
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
                  `<b>Platform TVL: ${formatNumDynDecimal(
                    statsList[0]?.tvlInAzero || 0,
                    4,
                  )} AZERO ($${formatNumDynDecimal(
                    statsList[0]?.tvlInUSD || 0,
                    4,
                  )})</b>`,
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
                  `<b>Platform TVL: ${formatNumDynDecimal(
                    TVLData?.tvlInAzero || 0,
                    4,
                  )} AZERO ($${formatNumDynDecimal(
                    TVLData?.tvlInUSD || 0,
                    4,
                  )})</b>`,
                  process.env.TELEGRAM_ID_CHAT || '',
                  threadId,
                );
              }
            })();
            break;
          case '/price':
            (async () => {
              try {
                let azeroInUSD = await getAzeroPrice('AZERO');
                console.log('\n processUpdateStats... /price');
                console.log('azeroInUSD', azeroInUSD);

                const inw2InAzero = await fetchInwPrice(
                  '5Dr3N2eP41e3BTMi6rxCJYeLGSS7Ggnayarx9FqCPZdmnnNj',
                );
                console.log('inw2InAzero', inw2InAzero);
                const inw2InUSD =
                  Number(azeroInUSD || 0) * Number(inw2InAzero || 0);

                send_telegram_message(
                  `<b>INW2 Price: ${formatNumDynDecimal(
                    inw2InAzero,
                    4,
                  )} AZERO ($${formatNumDynDecimal(inw2InUSD, 6)})</b>`,
                  process.env.TELEGRAM_ID_CHAT || '',
                  threadId,
                );
              } catch (error) {
                console.log('priceA0 error', error);
              }
            })();
            break;
          case '/price_iou':
            (async () => {
              try {
                let azeroInUSD = await getAzeroPrice('AZERO');
                console.log('\n processUpdateStats... /price');
                console.log('azeroInUSD', azeroInUSD);

                const iouInAzero = await fetchInwPrice(
                  '5CcUwJACT8vcSXG9U4nNLiA6U2yohP8smgBUSMgymKUbe1Bg',
                );
                console.log('iouInAzero', iouInAzero);
                const inw2InUSD =
                  Number(azeroInUSD || 0) * Number(iouInAzero || 0);

                send_telegram_message(
                  `<b>IOU Price: ${formatNumDynDecimal(
                    iouInAzero,
                    4,
                  )} AZERO ($${formatNumDynDecimal(inw2InUSD, 6)})</b>`,
                  process.env.TELEGRAM_ID_CHAT || '',
                  threadId,
                );
              } catch (error) {
                console.log('priceA0 error', error);
              }
            })();
            break;
          case '/testdd':
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

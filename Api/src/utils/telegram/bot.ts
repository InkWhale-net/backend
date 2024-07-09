import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import {fetchCommonPoolPrice, processUpdateStats} from '../../cronjob/Action';
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
                send_telegram_message(
                  `<b>Token list:\n /price_inw2 INW2\n /price_iou IOU\n /price_imun IMUN\n /price_kebab KEBAB\n /price_balda BALDA\n /price_sc SC\n /price_zpf ZPF\n /price_mugz MUGZ</b>`,
                  process.env.TELEGRAM_ID_CHAT || '',
                  threadId,
                );
              } catch (error) {
                console.log('priceA0 error', error);
              }
            })();
            break;
          case '/price_inw2':
            getCommonPoolPrice(
              threadId,
              'INW2',
              '5Dr3N2eP41e3BTMi6rxCJYeLGSS7Ggnayarx9FqCPZdmnnNj',
            )();
            break;
          case '/price_iou':
            getCommonPoolPrice(
              threadId,
              'IOU',
              '5CcUwJACT8vcSXG9U4nNLiA6U2yohP8smgBUSMgymKUbe1Bg',
            )();
            break;
          case '/price_imun':
            getCommonPoolPrice(
              threadId,
              'IMUN',
              '5Fyqc7v79MUiMPRqQswdrTU69W6jcEwTN3yxWh7EF9ZwP1tt',
            )();
            break;

          case '/price_kebab':
            getCommonPoolPrice(
              threadId,
              'KEBAB',
              '5DtsqFdRgxkQDceKtmMPB6MeCfjJRpir9R2uPVKoojayj26h',
            )();
            break;
          case '/price_balda':
            getCommonPoolPrice(
              threadId,
              'BALDA',
              '5EcFNb89oVXoz3Ria2bJus9TaKqsSxnXcqfUh5KCNpJxR526',
            )();
            break;
          case '/price_sc':
            getCommonPoolPrice(
              threadId,
              'SC',
              '5Ef2cGhQJPjQuZxodyGM7QCheUSivdya2wLynG4pSHrjMfx6',
            )();
            break;
          case '/price_zpf':
            getCommonPoolPrice(
              threadId,
              'ZPF',
              '5Fck3jA2UHqe1ktkMyeAe7w1eDJcf1QtADgQ6KShQEsgn1yc',
            )();
            break;
          case '/price_mugz':
            getCommonPoolPrice(
              threadId,
              'MUGZ',
              '5GYjkQG8q1ASeZ8sgtTN1bVwfr6TCJwNhRmpR5Zx6bsUdfLz',
            )();
            break;
          case '/pool':
            (async () => {
              try {
                send_telegram_message(
                  `<b>Pool list:\n /pool_inw2 INW2\n /pool_iou IOU\n /pool_imun IMUN\n /pool_kebab KEBAB\n /pool_balda BALDA\n /pool_sc SC\n /pool_zpf ZPF\n /pool_mugz MUGZ</b>`,
                  process.env.TELEGRAM_ID_CHAT || '',
                  threadId,
                );
              } catch (error) {
                console.log('priceA0 error', error);
              }
            })();
            break;
          case '/pool_inw2':
            send_telegram_message(
              `<b>AZERO-INW2 Pool: https://app.common.fi/pools/5Dr3N2eP41e3BTMi6rxCJYeLGSS7Ggnayarx9FqCPZdmnnNj</b>`,
              process.env.TELEGRAM_ID_CHAT || '',
              threadId,
            );
            break;
          case '/pool_iou':
            send_telegram_message(
              `<b>AZERO-IOU Pool: https://app.common.fi/pools/5CcUwJACT8vcSXG9U4nNLiA6U2yohP8smgBUSMgymKUbe1Bg</b>`,
              process.env.TELEGRAM_ID_CHAT || '',
              threadId,
            );
            break;
          case '/pool_imun':
            send_telegram_message(
              `<b>AZERO-IMUN Pool: https://app.common.fi/pools/5Fyqc7v79MUiMPRqQswdrTU69W6jcEwTN3yxWh7EF9ZwP1tt</b>`,
              process.env.TELEGRAM_ID_CHAT || '',
              threadId,
            );
            break;

          case '/pool_kebab':
            send_telegram_message(
              `<b>AZERO-KEBAB Pool: https://app.common.fi/pools/5DtsqFdRgxkQDceKtmMPB6MeCfjJRpir9R2uPVKoojayj26h</b>`,
              process.env.TELEGRAM_ID_CHAT || '',
              threadId,
            );
            break;
          case '/pool_balda':
            send_telegram_message(
              `<b>AZERO-BALDA Pool: https://app.common.fi/pools/5EcFNb89oVXoz3Ria2bJus9TaKqsSxnXcqfUh5KCNpJxR526</b>`,
              process.env.TELEGRAM_ID_CHAT || '',
              threadId,
            );
            break;
          case '/pool_sc':
            send_telegram_message(
              `<b>AZERO-SC Pool: https://app.common.fi/pools/5Ef2cGhQJPjQuZxodyGM7QCheUSivdya2wLynG4pSHrjMfx6</b>`,
              process.env.TELEGRAM_ID_CHAT || '',
              threadId,
            );
            break;
          case '/pool_zpf':
            send_telegram_message(
              `<b>AZERO-ZPF Pool: https://app.common.fi/pools/5Fck3jA2UHqe1ktkMyeAe7w1eDJcf1QtADgQ6KShQEsgn1yc</b>`,
              process.env.TELEGRAM_ID_CHAT || '',
              threadId,
            );
            break;
          case '/pool_mugz':
            send_telegram_message(
              `<b>AZERO-MUGZ Pool: https://app.common.fi/pools/5GYjkQG8q1ASeZ8sgtTN1bVwfr6TCJwNhRmpR5Zx6bsUdfLz</b>`,
              process.env.TELEGRAM_ID_CHAT || '',
              threadId,
            );
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

function getCommonPoolPrice(threadId: string, symbol: string, address: string) {
  return async () => {
    try {
      let azeroInUSD = await getAzeroPrice('AZERO');

      const poolPriceInAzero = await fetchCommonPoolPrice(address);

      const inw2InUSD = Number(azeroInUSD || 0) * Number(poolPriceInAzero || 0);

      console.log('\n');
      console.log('\n');
      console.log('\n===============================');
      console.log('poolPriceInAzero', poolPriceInAzero);
      console.log('inw2InUSD', inw2InUSD);
      console.log('\n===============================');
      console.log('azeroInUSD', azeroInUSD);
      console.log('threadId', threadId);
      console.log('process.env.TELEGRAM_ID_CHAT', process.env.TELEGRAM_ID_CHAT);
      console.log('\n===============================');
      console.log('\n');
      console.log('\n');
      send_telegram_message(
        `<b>${symbol} Price: ${formatNumDynDecimal(
          poolPriceInAzero,
          8,
        )} AZERO ($${formatNumDynDecimal(inw2InUSD, 8)})</b>`,
        process.env.TELEGRAM_ID_CHAT || '',
        threadId,
      );
    } catch (error) {
      console.log('pricePool error', error);
    }
  };
}

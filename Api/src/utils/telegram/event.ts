import * as mongoDB from 'mongodb';
import {
  convertNumberWithoutCommas,
  formatNumDynDecimal,
  resolveDomain,
  send_telegram_message,
} from '../utils';
const poolEvent = ['PoolUnstakeEvent', 'PoolStakeEvent', 'PoolClaimEvent'];
const farmingEvent = [
  'LpPoolStakeEvent',
  'LpPoolUnstakeEvent',
  'LpPoolClaimEvent',
];
const nftPoolEvent = [
  'NFTPoolStakeEvent',
  'NFTPoolUnstakeEvent',
  'NFTPoolClaimEvent',
];
export const create_event_db = async (
  data: any,
  eventTeleCollection: mongoDB.Collection,
) => {
  try {
    if (poolEvent.includes(data?.eventName)) {
      try {
        const result = await eventTeleCollection.insertOne({
          ...data,
          _id: `${data?.blockNumber}-${data?.eventName}-${data?.poolContract}-${data?.amount}-${data?.from}`,
        });

        if (result) {
          send_telegram_message(
            `<b>${
              data?.eventName == 'PoolUnstakeEvent'
                ? '😮Unstaking Event'
                : data?.eventName == 'PoolStakeEvent'
                ? '🚀Staking Event'
                : '🤑Reward Claim Event'
            }</b>
<b>${data?.tokenSymbol} Pool:</b>
<a href="${process.env.FRONTEND_URL}/#/pools/${data?.poolContract || '***'}">${
              data?.poolContract || '***'
            }</a>
<b>From:</b> <code>${(await resolveDomain(data?.from)) || '***'}</code>
<b>Amount: </b> <code>${
              data?.amount
                ? formatNumDynDecimal(
                    parseFloat(convertNumberWithoutCommas(data?.amount)) /
                      Math.pow(10, parseInt(data?.tokenDecimal)),
                  )
                : ''
            } ${data?.tokenSymbol || '***'}</code>
<b>Token contract:</b>
<code>${data?.tokenContract}</code>`,
            process.env.TELEGRAM_ID_CHAT || '',
            process.env.TELEGRAM_GROUP_FEED_THREAD_ID || '',
          );
        }
      } catch (error) {
        if (error.code === 11000) {
          console.log('Duplicate key error: Document already exists.');
        } else {
          console.log('Error creating document:', error);
        }
      }
    }
  } catch (error) {
    console.log('ERROR SEND TELE', error);
  }
};

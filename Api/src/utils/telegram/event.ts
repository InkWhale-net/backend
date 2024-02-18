import * as mongoDB from 'mongodb';
import {
  convertNumberWithoutCommas,
  formatNumDynDecimal,
  resolveDomain,
  send_telegram_message,
} from '../utils';
import axios from 'axios';
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
          _id: `${data?.blockNumber}${data?.eventName}${data?.from}${data?.poolContract}${data?.amount}`,
        });

        if (result) {
          send_telegram_message(
            `<b>${data?.eventName == 'PoolUnstakeEvent'
              ? '😮Unstaking Event'
              : data?.eventName == 'PoolStakeEvent'
                ? '🚀Staking Event'
                : '🤑Reward Claim Event'
            }</b>
<b>${data?.tokenSymbol} Pool:</b>
<a href="${process.env.FRONTEND_URL}/#/pools/${data?.poolContract || '***'}">${data?.poolContract || '***'
            }</a>
<b>From:</b> <code>${(await resolveDomain(data?.from)) || '***'}</code>
<b>Amount: </b> <code>${data?.amount
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
    if (nftPoolEvent.includes(data?.eventName)) {
      const resp = await axios.post(
        `${process.env.ARTZERO_API_BASE_URL}/getCollectionByAddress`,
        {
          collection_address: data?.NFTtokenContract,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      const { ret: nftData } = resp.data;

      const callerAzeroID = await resolveDomain(data?.from);
      try {
        const result = await eventTeleCollection.insertOne({
          ...data,
          _id: `${data?.blockNumber}${data?.eventName
            ?.replace('Pool', '')
            ?.replace('Event', '')}${data?.poolContract}${data?.amount || '***'
            }${data?.from}${data?.tokenID || '***'}`,
        });
        if (result) {
          if (
            ['NFTPoolStakeEvent', 'NFTPoolUnstakeEvent'].includes(
              data?.eventName,
            )
          ) {
            send_telegram_message(
              `<b>${data?.eventName == 'NFTPoolStakeEvent'
                ? '🚀Staking Event'
                : '😮Unstaking Event'
              }</b>
<b>NFT Pool:</b>
<a href="${process.env.FRONTEND_URL}/#/farms/${data?.poolContract || '***'}">${data?.poolContract || '***'
              }</a>
${nftData?.[0]?.name &&
              data?.tokenName &&
              `------------------------------
Stake: <code>${nftData?.[0]?.name}</code>
Earn : <code>${data?.tokenName}</code>
------------------------------`
              }
<b>From:</b>
<code>${data?.from ? callerAzeroID : '***'}</code>
<b>NFT TokenID: </b> <code>#${data?.tokenID || '***'}</code>
<b>NFT Collection address:</b>
<code>${data?.NFTtokenContract}</code>`,
              process.env.TELEGRAM_ID_CHAT || '',
              process.env.TELEGRAM_GROUP_FEED_THREAD_ID || '',
            );
          }
          if (data?.eventName == 'NFTPoolClaimEvent') {
            send_telegram_message(
              `<b>🤑Reward Claim Event</b>
<b>NFT Pool:</b>
<a href="${process.env.FRONTEND_URL}/#/farms/${data?.poolContract || '***'}">${data?.poolContract || '***'
              }</a>
${nftData?.[0]?.name &&
              data?.tokenName &&
              `------------------------------
Stake: <code>${nftData?.[0]?.name}</code>
Earn : <code>${data?.tokenName}</code>
------------------------------`
              }
<b>From:</b> <code>${callerAzeroID || '***'}</code>
<b>Amount: </b> <code>${data?.amount
                ? formatNumDynDecimal(
                  parseFloat(convertNumberWithoutCommas(data?.amount)) /
                  Math.pow(10, parseInt(data?.tokenDecimal)),
                )
                : ''
              } ${data?.tokenSymbol || '***'}</code>
<b>Token contract </b> <code>${data?.tokenContract}</code>`,
              process.env.TELEGRAM_ID_CHAT || '',
              process.env.TELEGRAM_GROUP_FEED_THREAD_ID || '',
            );
          }
        }
      } catch (error) {
        if (error.code === 11000) {
          console.log('Duplicate key error: Document already exists.');
        } else {
          console.log('Error creating document:', error);
        }
      }
    }
    if (farmingEvent.includes(data?.eventName)) {
      try {
        const result = await eventTeleCollection.insertOne({
          ...data,
          _id: `${data?.blockNumber}${data?.eventName}${data?.from}${data?.poolContract}${data?.amount}`,
        });

        if (result) {
          if (
            ['LpPoolStakeEvent', 'LpPoolUnstakeEvent'].includes(data?.eventName)
          ) {
            send_telegram_message(
              `<b>${data?.eventName == 'LpPoolStakeEvent'
                ? '🚀Staking Event'
                : '😮Unstaking Event'
              }</b>
<b>Farming:</b>
<a href="${process.env.FRONTEND_URL}/#/farming/${data?.poolContract || '***'
              }">${data?.poolContract || '***'}</a>
${data?.lptokenName &&
              data?.tokenName &&
              `------------------------------
Stake: <code>${data?.lptokenName}</code>
<code>${data?.lptokenContract}</code>
Earn : <code>${data?.tokenName}</code>
<code>${data?.tokenContract}</code>
------------------------------`
              }
<b>From:</b> <code>${await resolveDomain(data?.from)}</code>
<b>Amount: </b> <code>${data?.amount
                ? formatNumDynDecimal(
                  parseFloat(data?.amount) /
                  Math.pow(10, parseInt(data?.lptokenDecimal)),
                )
                : ''
              } ${data?.lptokenSymbol || '***'}</code>`,
              process.env.TELEGRAM_ID_CHAT || '',
              process.env.TELEGRAM_GROUP_FEED_THREAD_ID || '',
            );
          }
          if (data?.eventName == 'LpPoolClaimEvent') {
            send_telegram_message(
              `<b>🤑Reward Claim Event</b>
<b>Farming:</b>
<a href="${process.env.FRONTEND_URL}/#/farming/${data?.poolContract || '***'
              }">${data?.poolContract || '***'}</a>
${data?.lptokenName &&
              data?.tokenName &&
              `------------------------------
Stake: <code>${data?.lptokenName}</code>
<code>${data?.lptokenContract}</code>
Earn : <code>${data?.tokenName}</code>
<code>${data?.tokenContract}</code>
------------------------------`
              }
<b>From:</b> <code>${await resolveDomain(data?.from)}</code>
<b>Amount: </b> <code>${data?.amount
                ? formatNumDynDecimal(
                  parseFloat(data?.amount) /
                  Math.pow(10, parseInt(data?.tokenDecimal)),
                )
                : ''
              } ${data?.tokenSymbol || '***'}</code>`,
              process.env.TELEGRAM_ID_CHAT || '',
              process.env.TELEGRAM_GROUP_FEED_THREAD_ID || '',
            );
          }
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

export const send_noti_azero_stacking = async (
  data: any,
  eventTeleCollection: mongoDB.Collection,
) => {
  try {
    // console.log("******************************", data);
    switch (data?.eventName) {
      case 'StakeEvent':
        send_telegram_message(
          `<b>🤑Azero Stake Event </b>
<b>From:</b> <code>${await resolveDomain(data?.eventValues?.[0])}</code>
<b>Amount:</b> <code>${data?.eventValues?.[1]
            ? formatNumDynDecimal(
              parseFloat(data?.eventValues?.[1]) / Math.pow(10, 12),
            )
            : ''
          }Azero</code>`,
          process.env.TELEGRAM_ID_CHAT || '',
          process.env.TELEGRAM_AZERO_GROUP_FEED_THREAD_ID || '',
        );
        break;
      case 'ClaimEvent':
        send_telegram_message(
          `<b>😮Azero UnStake Event </b>
<b>From:</b> <code>${await resolveDomain(data?.eventValues?.[1])}</code>
<b>Amount:</b> <code>${data?.eventValues?.[2]
            ? formatNumDynDecimal(
              parseFloat(data?.eventValues?.[2]) / Math.pow(10, 12),
            )
            : ''
          }Azero</code>`,
          process.env.TELEGRAM_ID_CHAT || '',
          process.env.TELEGRAM_AZERO_GROUP_FEED_THREAD_ID || '',
        );
        break;
      case 'ClaimRewardsEvent':
        //         send_telegram_message(
        //           `<b>😮Azero UnStake Event </b>
        // <b>From:</b> <code>${await resolveDomain(data?.eventValues?.[1])}</code>
        // <b>Amount:</b> <code>${data?.eventValues?.[2]
        //             ? formatNumDynDecimal(
        //               parseFloat(data?.eventValues?.[2]) /
        //               Math.pow(10, 12),
        //             )
        //             : ''} Azero</code>`,
        //           process.env.TELEGRAM_ID_CHAT || '',
        //           process.env.TELEGRAM_GROUP_FEED_THREAD_ID || '',
        //         );
        break;
    }
  } catch (error) {
    console.log('ERROR SEND TELE AZERO STACKING', error);
  }
}
import {Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {ContractPromise} from '@polkadot/api-contract';
import azero_staking from '../contracts/azero_staking';
import {globalApi} from '../index';
import {convertToUTCTime} from '../utils/Tools';
import {CRONJOB_TIME} from '../utils/constant';
import { processAzeroStacking } from '../utils/telegram/azerostacking';
import dotenv from 'dotenv';
dotenv.config();

@cronJob()
export class CronJobUpdateAzeroStacking implements Provider<CronJob> {
  constructor() {}

  value() {
    return new CronJob({
      cronTime: CRONJOB_TIME.AZERO_STACKING_ADMIN,
      onTick: async () => {
        if (process.env.IS_ENABLE_JOB_AZERO_STACKING_ADMIN == 'true') {
          try {
            const currentTime = convertToUTCTime(new Date());
            console.log(
              'RUN JOB CronJobUpdateAzeroStacking NOW: ' + currentTime,
            );
            const azero_stacking_contract = new ContractPromise(
              globalApi,
              azero_staking.CONTRACT_ABI,
              azero_staking.CONTRACT_ADDRESS,
            );
            await processAzeroStacking(globalApi, azero_stacking_contract);
          } catch (e) {
            console.log(`ERROR: CronJobUpdateAzeroStacking - ${e.message}`);
          }
        }
      },
      start: true,
    });
  }
}

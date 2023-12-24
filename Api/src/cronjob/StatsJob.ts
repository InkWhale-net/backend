import {Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
import {
  LpPoolsSchemaRepository,
  NftPoolsSchemaRepository,
  PoolsSchemaRepository,
  StatsSchemaRepository,
} from '../repositories';
import {CRONJOB_TIME} from '../utils/constant';
import {convertToUTCTime} from '../utils/Tools';
import {processUpdateStats} from './Action';

@cronJob()
export class CronJobUpdateStats implements Provider<CronJob> {
  constructor(
    @repository(StatsSchemaRepository)
    public statsSchemaRepository: StatsSchemaRepository,
    @repository(PoolsSchemaRepository)
    public poolsSchemaRepository: PoolsSchemaRepository,
    @repository(NftPoolsSchemaRepository)
    public nftPoolsSchemaRepository: NftPoolsSchemaRepository,
    @repository(LpPoolsSchemaRepository)
    public lpPoolsSchemaRepository: LpPoolsSchemaRepository,
  ) {}

  value() {
    return new CronJob({
      cronTime: CRONJOB_TIME.STATS,
      onTick: async () => {
        try {
          const currentTime = convertToUTCTime(new Date());
          console.log('RUN JOB CronJobUpdateStats NOW: ' + currentTime);
          await processUpdateStats(
            this.statsSchemaRepository,
            this.poolsSchemaRepository,
            this.nftPoolsSchemaRepository,
            this.lpPoolsSchemaRepository
          );
        } catch (e) {
          console.log(`ERROR: CronJobUpdateStats - ${e.message}`);
        }
      },
      start: true,
    });
  }
}

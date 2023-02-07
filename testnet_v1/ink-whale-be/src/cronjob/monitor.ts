import {
    CRONJOB_ENABLE,
    CRONJOB_TIME,
} from "../utils/constant";
import { Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {repository} from "@loopback/repository";
import axios from "axios";

@cronJob()
export class CronJobMonitor implements Provider<CronJob> {
    constructor(
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.MONITOR,
            onTick: async () => {
                try {
                    if (CRONJOB_ENABLE.MONITOR) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log("RUN JOB CREATE MONITOR NOW: " + currentTime);
                    }
                }catch (e) {
                    console.log(e);
                }
            },
            start: true,
        });
    }
}
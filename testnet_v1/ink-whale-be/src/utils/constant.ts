export const EACH_HOUR = '0 * * * *';                          // Every 1 hour
export const EACH_MINUTE = '* * * * *';                        // Every 1 minute
export const EACH_3_MINUTES = '* * * * *';                     // Every 3 minute
export const EACH_30_MINUTES = '*/30 * * * *';                 // Every 30 minutes
export const EACH_5_MINUTES = '*/5 * * * *';                   // Every 5 minutes
export const EACH_SECOND = '*/1 * * * * *';                    // Every 1 second
export const EACH_15_SECONDS = '*/15 * * * * *';               // Every 15 seconds
export const EACH_30_SECONDS = '*/30 * * * * *';               // Every 30 seconds

export const CRONJOB_TIME = {
    POOL: EACH_MINUTE
};

export const IS_DEBUG = true; // set TRUE for debugging at the localhost by REST api, FALSE for run on the server
export const CRONJOB_ENABLE = {
    POOL: !IS_DEBUG
};

export const FAILED = 'FAILED';
export const OK = 'OK';
export const SUCCESS = 'SUCCESS';

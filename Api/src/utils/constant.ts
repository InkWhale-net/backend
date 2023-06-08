import dotenv from "dotenv";
dotenv.config();

export const EACH_HOUR = '0 * * * *';                           // Every 1 hour
export const EACH_3_HOUR = '0 */3 * * *';                       // Every 3 hours
export const EACH_MINUTE = '* * * * *';                         // Every 1 minute
export const EACH_3_MINUTES = '*/3 * * * *';                    // Every 3 minute
export const EACH_5_MINUTES = '*/5 * * * *';                    // Every 5 minute
export const EACH_7_MINUTES = '*/7 * * * *';                    // Every 7 minute
export const EACH_11_MINUTES = '*/11 * * * *';                  // Every 11 minute
export const EACH_13_MINUTES = '*/13 * * * *';                  // Every 13 minute
export const EACH_15_MINUTES = '*/15 * * * *';                  // Every 15 minute
export const EACH_30_MINUTES = '*/30 * * * *';                  // Every 30 minutes
export const EACH_SECOND = '*/1 * * * * *';                     // Every 1 second
export const EACH_3_SECONDS = '*/3 * * * * *';                  // Every 3 seconds
export const EACH_5_SECONDS = '*/5 * * * * *';                  // Every 5 seconds
export const EACH_7_SECONDS = '*/7 * * * * *';                  // Every 7 seconds
export const EACH_11_SECONDS = '*/11 * * * * *';                // Every 11 seconds
export const EACH_13_SECONDS = '*/13 * * * * *';                // Every 13 seconds
export const EACH_10_SECONDS = '*/10 * * * * *';                // Every 10 seconds
export const EACH_15_SECONDS = '*/15 * * * * *';                // Every 15 seconds
export const EACH_30_SECONDS = '*/30 * * * * *';                // Every 30 seconds

export const CRONJOB_TIME = {
    INW_POOL: process.env.CRONJOB_TIME_INW_POOL ?? EACH_15_SECONDS,
    INW_POOL_SCAN_ALL: process.env.CRONJOB_TIME_INW_POOL_SCAN_ALL ?? EACH_5_MINUTES,
};

export const CRONJOB_ENABLE = {
    INW_POOL: (process.env.IS_ENABLE_JOB_INW_POOL == "true"),
    INW_POOL_SCAN_ALL: (process.env.IS_ENABLE_JOB_INW_POOL_SCAN_ALL == "true"),
};

export const IS_ENABLE_DOCS = (process.env.IS_ENABLE_DOCS == "true"); // set FALSE for disabling api explorer

export const STATUS = {
    FAILED: 'FAILED',
    OK: 'OK',
    SUCCESS: 'SUCCESS'
}

export const MESSAGE = {
    SUCCESS: "SUCCESS",
    NO_INPUT: "No Input",
    NO_ADDRESS: "No address",
    NO_TOKEN_ID: "No Token ID",
    NO_IMAGES: "No Images",
    NO_IMAGE_TYPE: "No Image Type",
    NO_METADATA: "No Metadata",
    INVALID_EMAIL_FORMAT: "Invalid email format!",
    INVALID_ADDRESS: "Invalid Address",
    INVALID_INPUT: "Invalid Input",
    INVALID_AUTHENTICATION: "Invalid Authentication",
    INVALID_COLLECTION_ADDRESS: "Invalid Collection Address",
    INVALID_PROJECT_ADDRESS: "Invalid Project Address",
    INVALID_POOL_CONTRACT: "Invalid Pool Contract",
    INVALID_NFT_ADDRESS: "Invalid NFT contract address",
    INVALID_BLACKLIST_TYPE_NAME: "Invalid type name of blacklist",
    NOT_FOUND_POOL_CONTRACT: "Not found the pool contract",
    NOT_FOUND_QUEUE: "Not found queue",
    NOT_FOUND_OWNER: "Not found owner",
    NOT_EXIST_ADDRESS: "Not Exist Address",
    NOT_EXIST_ADDRESS_INACTIVE: "Not Exist Address/Inactive",
    NOT_EXIST_COLLECTION_ADDRESS: "Not Exist Collection Address",
    DUPLICATED_ADDRESS: "Duplicated Address",
    DUPLICATED_RECORD: "Duplicated Record",
    INPUT_ALREADY_EXIST: "Input already exist",
    JSON_NOT_EXIST: "JSON not exist",
    SIGN: "Sign message to report",
    DUPLICATED_TOKEN: "Token existed in system",
    SIGN_IMPORT_TOKEN: "Sign message to import token",
    INVALID_TOKEN_SUPPLY: "Invalid token supply",
    INVALID_TOKEN_OWNER: "Invalid token owner",
    INVALID_SIGNATURE: "Invalid token signature",
    IMPORT_TOKEN_SUCCESS: "Import token success",
    UNKNOW_ERROR: "Unknow error",
    GET_INW_TOTAL_SUPPLY_FAIL: "Get INW total supply fail",
    GET_INW_TOTAL_SUPPLY_SUCCESS: "Get INW total supply success",
    GET_INW_IN_CIRCULATION_SUCCESS: 'Get INW In Circulation success',
    GET_INW_IN_CIRCULATION_FAIL: 'Get INW In Circulation fail'
}

export const CONFIG_TYPE_NAME = {
    INW_POOL: "CronJobUpdatePools",
    INW_POOL_SCAN_ALL: "CronJobUpdateAllPools"
};

export const ADDRESSES_INW = {
    INW_TREASURY: '5FKbmp1Fe6tBzUU8wvfgkiuvRTRb15rt6R4K7vkLaWG7AGFh',
    INT_GROWTH: '5DJdkQWR22B9cqEijAx3ELaJHwwcxAEkVeDUpiVkB3LATAbz',
    INW_REWARD_POOL: '5CZcZB1CqWLc1PKNScrd8RX38Y1Pe4Mv9BuzqVhrHcxzHDZe',
    INW_TEAM: '5DtKc7qBE3fmGLHWGbqtYdvhBxkWpTfPfvGABsoqTVyesLsQ'
}

export const PRIVATE_SALE_WALLET_ADDRESS = '5ChixeyBqMXJo8XSrfq4S2aFEMMrxkBzqaFsvqSij51JTzXj'

export const PUBLIC_SALE_WALLET_ADDRESS = '5FNBTYUaggJ5p66nHuRob67ava4Q7N1uu9f1ZEJetZxxkr4D';

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
};

export const CRONJOB_ENABLE = {
    INW_POOL: (process.env.IS_ENABLE_JOB_INW_POOL == "true"),
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
    SIGN: "Sign message to report"
}

export const CONFIG_TYPE_NAME = {
    INW_POOL: "CronJobUpdatePools",
};
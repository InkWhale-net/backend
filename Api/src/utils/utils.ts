import {BN, BN_ONE, hexToU8a, isHex} from "@polkadot/util";
import {decodeAddress, encodeAddress} from "@polkadot/keyring";
import {ApiPromise} from "@polkadot/api";
import {WeightV2} from "@polkadot/types/interfaces";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);

export function send_telegram_message(message: string) {
    try {
        new Promise(async () => {
            await axios({
                baseURL: process.env.TELEGRAM_URL,
                url: "/sendMessage",
                method: "post",
                data: {
                    "chat_id": process.env.TELEGRAM_ID_CHAT,
                    "text": `${process.env.NODE_IP}: ${message}`
                },
                headers: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }).then(() => {});
    } catch (e) {
        console.log(e);
    }
}

export function randomString (length: number): string {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export function isValidAddressPolkadotAddress(address: string): boolean {
    try {
        encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
        return true;
    } catch (error) {
        return false;
    }
}

export async function delay(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

export function todayFolder(): string {
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; // months = require(1-12)
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const hour = dateObj.getHours();
    return year + "/" + month + "/" + day + "/" + hour;
}

export function readOnlyGasLimit(api: ApiPromise):WeightV2 {
    return api.registry.createType('WeightV2', {
        refTime: new BN(1_000_000_000_000),
        proofSize: MAX_CALL_WEIGHT,
    });
}

export function isAzEnabled(azDomainAddress?: string): boolean {
    try {
        if (!azDomainAddress) {
            return false;
        }
        let azeroDomainConfig = process.env.AZERO_DOMAIN_LIST;
        if (azeroDomainConfig) {
            const tmp = azeroDomainConfig.split(',');
            return (tmp.indexOf(azDomainAddress) > -1);
        }
    } catch (e) {
        console.log(`ERROR - isAzEnabled: ${e.messages}`);
    }
    return false;
}
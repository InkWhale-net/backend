import {BN, BN_ONE, hexToU8a, isHex} from "@polkadot/util";
import {decodeAddress, encodeAddress} from "@polkadot/keyring";
import {ApiPromise} from "@polkadot/api";
import {WeightV2} from "@polkadot/types/interfaces";


const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);

export function splitFileName (path: string) {
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

// export async function getFileTypeFromCID (ipfs: API, cid: IPFSPath): Promise<FileTypeResult | undefined> {
//     return await fromStream(toStream(ipfs.cat(cid, {
//         length: 100 // or however many bytes you need
//     })));
// }

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
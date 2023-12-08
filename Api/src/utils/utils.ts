import {BN, BN_ONE, formatBalance, hexToU8a, isHex, u8aToHex} from "@polkadot/util";
import {decodeAddress, encodeAddress} from "@polkadot/keyring";
import {ApiPromise} from "@polkadot/api";
import {WeightV2} from "@polkadot/types/interfaces";
import axios from "axios";
import dotenv from "dotenv";
import {signatureVerify} from '@polkadot/util-crypto';
import winston from "winston";
import {Abi, ContractPromise} from "@polkadot/api-contract";
import {inw_token} from "../contracts/inw_token";
import {ApiBase} from "@polkadot/api/base";
import { psp22_contract_old } from "../contracts/psp22_old";
import { owner } from "./Pools";
import { psp22_contract } from "../contracts/psp22";
import numeral from "numeral";

dotenv.config();

const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);

export const logger = winston.createLogger({
    level: "silly",
    format: winston.format.combine(
        winston.format.timestamp(), // adds a timestamp property
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: "logs/sendBulkToken_error.log", level: "error"}),
        new winston.transports.File({filename: "logs/sendBulkToken_info.log", level: "info"}),
        new winston.transports.File({filename: "logs/sendBulkToken_warn.log", level: "warn"}),
        new winston.transports.File({filename: "logs/sendBulkToken.log"}),
    ],
});

export function convertNumberWithoutCommas(input: string):string {
    return input.replace(/,/g, "");
}
export function send_telegram_message(
  message: string,
  chatid: string,
  threadid: string,
) {
  try {
    new Promise(async () => {
      await axios({
        baseURL: `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`,
        url: '/sendMessage',
        method: 'post',
        data: {
          chat_id: chatid,
          text: message,
          message_thread_id: threadid,
          parse_mode: 'html',
        },
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
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

export function isInwWhaleDisabledCollections(collectionAddress?: string): boolean {
    try {
        if (!collectionAddress) {
            return false;
        }
        let inkWhaleDisabledCollection = process.env.INW_DISABLED_COLLECTION;
        if (inkWhaleDisabledCollection) {
            const tmp = inkWhaleDisabledCollection.split(',');
            return (tmp.indexOf(collectionAddress) > -1);
        }
    } catch (e) {
        console.log(`ERROR - isInwWhaleDisabledCollections: ${e.messages}`);
    }
    return false;
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

export const isValidSignature = (
    signedMessage: string,
    signature: string,
    address: string,
  ) => {
    const publicKey = decodeAddress(address);
    const hexPublicKey = u8aToHex(publicKey);
  
    return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
  };

export const roundUp = (v: any, n = 4) =>
  Math.ceil(v * Math.pow(10, n)) / Math.pow(10, n);

export async function fetchUserBalance({currentAccount, api, userAccount, isCheckInw}: any) {
    try {
        if (currentAccount && api && userAccount) {
            const {
                data: {free, miscFrozen},
            } = await api.query.system.account(currentAccount);
            const [chainDecimals] = await api.registry.chainDecimals;
            const formattedStrBal: string = formatBalance(free, {
                withSi: false,
                forceUnit: "-",
                decimals: chainDecimals
            });
            const formattedStrBalMiscFrozen = formatBalance(miscFrozen, {
                withSi: false,
                forceUnit: "-",
                decimals: chainDecimals
            });
            const formattedNumBal =
                parseFloat(formattedStrBal.replace(",", ""))
                -
                parseFloat(formattedStrBalMiscFrozen.replace(",", ""));
            let inwBalance = 0;
            if (isCheckInw) {
                const inwBalanceTmp = await execContractQuery(
                    currentAccount,
                    userAccount,
                    api,
                    new Abi(inw_token.CONTRACT_ABI),
                    inw_token.CONTRACT_ADDRESS,
                    0,
                    "psp22::balanceOf"
                );
                if (inwBalanceTmp) {
                    inwBalance = inwBalanceTmp;
                }
            }
            return {
                balance: formattedNumBal,
                inwBalance: inwBalance
            };
        }
    } catch (e) {
        logger.error(e);
    }
    return {
        balance: 0,
        inwBalance: 0,
    }
}

export function shortenNumber(number: number) {
    return nFormatter(number, 1);
}

function nFormatter(num: number, digits: number) {
    let si = [
        {value: 1, symbol: ""},
        {value: 1e3, symbol: "K"},
        {value: 1e6, symbol: "M"},
        {value: 1e9, symbol: "G"},
        {value: 1e12, symbol: "T"},
        {value: 1e15, symbol: "P"},
        {value: 1e18, symbol: "E"},
    ];
    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export async function execContractQuery(
    callerAddress: string,
    userAccount: string,
    api: ApiPromise,
    contractAbi: Abi,
    contractAddress: string,
    value = 0,
    queryName: string
): Promise<number> {
    const contract = new ContractPromise(api, contractAbi, contractAddress);
    const gasLimit = readOnlyGasLimit(api);
    if (gasLimit) {
        try {
            const { result, output } = await contract.query[queryName](
                callerAddress,
                {
                    gasLimit,
                    value
                },
                userAccount
            );
            if (result.isOk && output) {
                // @ts-ignore
                const isOk = output.toHuman()?.Ok;
                if (isOk) {
                    const stringData = isOk.replace(/,/g, "");
                    const toNumber = parseFloat(stringData) / (10 ** 12);
                    return toNumber;
                }
            }
        } catch (error) {
            // @ts-ignore
            logger.error(`@_@ ${queryName} error >> ${error}`);
        }
    }
    return 0;
}

export async function getGasLimit(
    api: ApiBase<any>,
    userAddress: string,
    message: string,
    contract: ContractPromise,
    options: object = {},
    args: any[] = []
) {
    const abiMessage = toContractAbiMessage(contract, message);
    if (!abiMessage.ok) return abiMessage;
    // @ts-ignore
    const {value, gasLimit, storageDepositLimit} = options;
    // @ts-ignore
    const {gasRequired} = await api.call.contractsApi.call(
        userAddress,
        contract.address,
        value ?? new BN(0),
        gasLimit ?? null,
        storageDepositLimit ?? null,
        abiMessage?.value?.toU8a(args)
    );
    return {ok: true, value: gasRequired};
}

const toContractAbiMessage = (
    contractPromise: ContractPromise,
    message: string
) => {
    const abiMessages = contractPromise.abi.messages.find((m) => m.method === message);
    // logger.info({abiMessages: abiMessages});
    if (!abiMessages) {
        const messages = contractPromise?.abi.messages.map((m) => m.method).join(', ');
        const error = `"${message}" not found in metadata.spec.messages: [${messages}]`;
        console.error(error);
        return {ok: false, error};
    }
    return {ok: true, value: abiMessages};
};

export const getAzeroPrice = async (symbol: string) => {
    const { data } = await axios({
      baseURL: "https://pro-api.coinmarketcap.com/v2",
      url: `/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USD`,
      method: "get",
      headers: {
        "Accept": "application/json",
        "X-CMC_PRO_API_KEY": process.env.X_CMC_PRO_API_KEY
      },
    });
  
    let obj = data.data;
    let keys = Object.keys(obj);
    let result = obj[keys[0]];
    
    let price = result.filter((item: any) => item.symbol === symbol)[0].quote.USD.price;
    return price
  }
  
export const getAllFloorPriceArtZero = async () => {
    const { data } = await axios({
      baseURL: process.env.ARTZERO_API_BASE_URL,
      url: `/getAllCollectionsFloorPrice`,
      method: "post",
      headers: {
        "Accept": "application/json",
      },
    });
    return data?.ret?.filter((data: any) => data?.floorPrice)
  }

const getOldTokenOwner = async (api: any, contractAddress: any) => {
  try {
    const psp22_contract_old_calls = new ContractPromise(
      api,
      psp22_contract_old.CONTRACT_ABI,
      contractAddress,
    );
    let _owner = await owner(api, psp22_contract_old_calls, '');
    return _owner;
  } catch (error) {
    console.log(
      'Error: can not get token owner',
    );
    console.log(error);
  }
};
export const getTokenOwner = async (api: any, contractAddress: any) => {
  try {
    const psp22_contract_calls = new ContractPromise(
      api,
      psp22_contract.CONTRACT_ABI,
      contractAddress,
    );

    let _owner = await owner(api, psp22_contract_calls, '');
    return _owner;
  } catch (error) {
    //   console.log(
    //     'WARNING: can not get token owner, trying get with old contract',
    //   );
    return getOldTokenOwner(api, contractAddress);
  }
};

export const formatNumDynDecimal = (
  num: any = 0,
  dec: any = 4,
): string => {
  const result = (num * 10 ** dec) / 10 ** dec;
  const numStr = result.toString();
  const dotIdx = numStr.indexOf('.');

  if (dotIdx === -1) {
    return numeral(numStr).format('0,0');
  }

  const intPart = numeral(numStr.slice(0, dotIdx)).format('0,0');
  const decPart = numStr.slice(dotIdx + 1, numStr.length);

  return intPart + `${dotIdx === -1 ? '' : `.${decPart}`}`;
};

export const resolveDomain = async (
  address: string,
): Promise<string | undefined> => {
  try {
    // if (process.env.REACT_APP_NETWORK === 'inkwhale-testnet') {
    //   const domains: any = await resolveAddressToDomain(address, {
    //     chainId: SupportedChainId.AlephZeroTestnet,
    //   });
    //   return domains[0];
    // } else {
    //   const domains: any = await resolveAddressToDomain(address, {
    //     chainId: SupportedChainId.AlephZero,
    //   });
    //   return domains[0];
    // }
    return;
  } catch (error) {
    console.log('resolveDomain error', error);
  }
};
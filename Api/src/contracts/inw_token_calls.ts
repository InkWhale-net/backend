import {KeyringPair} from "@polkadot/keyring/types";
import {fetchUserBalance, getGasLimit, logger, readOnlyGasLimit, shortenNumber} from "../utils/utils";
import {ContractPromise} from "@polkadot/api-contract";
import {ApiPromise} from "@polkadot/api";
import BN from 'bn.js';

let inw_contract: ContractPromise;

export function setContract(c: ContractPromise) {
    inw_contract = c;
}

export async function transfer(keypair: KeyringPair, caller: string, account: string, amount: string) {
    logger.info({
        transfer: {
            caller: caller,
            account: account,
            amount: amount,
        }
    })
    const gasLimitResult = await getGasLimit(
        inw_contract.api,
        caller,
        "psp22::transfer",
        inw_contract,
        {},
        [account, amount, []]
    );

    if (!gasLimitResult.ok) {
        // @ts-ignore
        logger.error('gasLimitResult.error', gasLimitResult?.error);
        return;
    }
    const {value: gasLimit} = gasLimitResult;
    const value = 0;

    // @ts-ignore
    await inw_contract.tx["psp22::transfer"]({gasLimit, value}, account, amount, [])
        .signAndSend(
            keypair,
            async ({status, dispatchError}) => {
                if (dispatchError) {
                    if (dispatchError.isModule) {
                        logger.error(`There is some error with your request`);
                    } else {
                        logger.error(`dispatchError: ${dispatchError.toString()}`);
                    }
                }
                if (status) {
                    // logger.info({
                    //     status: status?.toHuman()
                    // });
                    logger.warn(status?.toHuman());
                    // @ts-ignore
                    const statusText = Object.keys(status?.toHuman())[0];
                    if (statusText === "0") {
                        logger.info(`   Transfering Tokens ...`);
                    }
                }
            }
        )
        .catch((e: any) => logger.error("    Err:", e));
}

export async function getBalance(
    api: ApiPromise,
    accountAddress: string,
    userAccount: string,
): Promise<number> {
    const data: {balance: number} = await fetchUserBalance({
        currentAccount: accountAddress,
        api: api,
        userAccount: userAccount,
        isCheckInw: false
    });
    return data.balance;
}

export async function getAllBalance(
    api: ApiPromise,
    accountAddress: string,
    userAccount: string,
): Promise<{
    a0: number,
    inw: number
}> {
    const data: {balance: number, inwBalance: number} = await fetchUserBalance({
        currentAccount: accountAddress,
        api: api,
        userAccount: userAccount,
        isCheckInw: true
    });
    return {
        a0: data.balance,
        inw: data.inwBalance,
    };
}
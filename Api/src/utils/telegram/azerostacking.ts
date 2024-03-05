import {ApiPromise} from '@polkadot/api';
import {ContractPromise} from '@polkadot/api-contract';
import {
  convertNumberWithoutCommas,
  readOnlyGasLimit,
  send_telegram_message,
} from '../utils';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const getAzeroInterestBalance = async (
  api: ApiPromise,
  azero_stacking_contract: ContractPromise,
) => {
  const {result, output} = await azero_stacking_contract.query[
    'azeroStakingTrait::getAzeroInterestAccount'
  ]('', {value: 0, gasLimit: readOnlyGasLimit(api)});
  if (result.isOk && output) {
    // @ts-ignore
    const data = output?.toHuman()?.Ok.replace(/,/g, '');
    return data / 10 ** 12;
  }
};

export const getInwInterestBalance = async (
  api: ApiPromise,
  azero_stacking_contract: ContractPromise,
) => {
  const {result, output} = await azero_stacking_contract.query[
    'azeroStakingTrait::getInwInterestAccount'
  ]('', {value: 0, gasLimit: readOnlyGasLimit(api)});
  if (result?.isOk && output) {
    // @ts-ignore
    const data = output?.toHuman()?.Ok.replace(/,/g, '');
    return data / 10 ** 12;
  }
};
export const getStakeList = async (
  api: ApiPromise,
  azero_stacking_contract: ContractPromise,
) => {
  const {result, output} = await azero_stacking_contract.query[
    'azeroStakingTrait::getStakerList'
  ]('', {value: 0, gasLimit: readOnlyGasLimit(api)});
  if (result.isOk && output) {
    // @ts-ignore
    return output?.toHuman()?.Ok;
  }
};
export const getStakeInfo = async (
  api: ApiPromise,
  azero_stacking_contract: ContractPromise,
  address: string,
) => {
  const {result, output} = await azero_stacking_contract.query[
    'azeroStakingTrait::getStakeInfo'
  ]('', {value: 0, gasLimit: readOnlyGasLimit(api)}, address);
  if (result.isOk && output) {
    // @ts-ignore
    return output?.toHuman()?.Ok.Ok;
  }
};
export const getPayableAzero = async (
  api: ApiPromise,
  azero_stacking_contract: ContractPromise,
) => {
  const {result, output} = await azero_stacking_contract.query[
    'azeroStakingTrait::getPayableAzero'
  ]('', {value: 0, gasLimit: readOnlyGasLimit(api)});
  if (result.isOk && output) {
    // @ts-ignore
    const data = output?.toHuman()?.Ok?.Ok?.replace(/,/g, '');
    return data / 10 ** 12;
  }
};
export const getAzeroBalanceOfStakingContract = async (
  api: ApiPromise,
  azero_stacking_contract: ContractPromise,
) => {
  const {result, output} = await azero_stacking_contract.query[
    'azeroStakingTrait::getAzeroBalance'
  ]('', {value: 0, gasLimit: readOnlyGasLimit(api)});
  if (result.isOk && output) {
    // @ts-ignore
    const data = output?.toHuman()?.Ok?.replace(/,/g, '');
    return data / 10 ** 12;
  }
};
export const getAzeroStakeBalance = async (
  api: ApiPromise,
  azero_stacking_contract: ContractPromise,
) => {
  const {result, output} = await azero_stacking_contract.query[
    'azeroStakingTrait::getAzeroStakeAccount'
  ]('', {value: 0, gasLimit: readOnlyGasLimit(api)});
  if (result.isOk && output) {
    // @ts-ignore
    const data = output?.toHuman()?.Ok?.replace(/,/g, '');
    return data / 10 ** 12;
  }
};
export const getUnclaimedRewardsData = async (
  api: ApiPromise,
  azero_stacking_contract: ContractPromise,
) => {
  const stakeList = await getStakeList(api, azero_stacking_contract);

  const listInfo = await Promise.all(
    stakeList.map(async (addr: any) => {
      const info = await getStakeInfo(api, azero_stacking_contract, addr);
      const unclaimedAzero =
        // @ts-ignore
        convertNumberWithoutCommas(info?.unclaimedAzeroReward) /
        Math.pow(10, 12);

      const unclaimedInw =
        // @ts-ignore
        convertNumberWithoutCommas(info?.unclaimedInwReward) / Math.pow(10, 12);

      return {
        unclaimedAzero,
        unclaimedInw,
      };
    }),
  );
  console.log('listInfo', listInfo);
  const totalUnclaimedRewards = listInfo?.reduce(
    (prev, curr) => ({
      azero: prev?.azero + curr?.unclaimedAzero,
      inw: prev?.inw + curr?.unclaimedInw,
    }),
    {
      azero: 0,
      inw: 0,
    },
  );
  return totalUnclaimedRewards;
};

export async function processAzeroStacking(
  api: ApiPromise,
  azero_stacking_contract: ContractPromise,
) {
  try {
    const inwInterestBalance: any = await getInwInterestBalance(
      api,
      azero_stacking_contract,
    );

    const azeroInterestBalance: any = await getAzeroInterestBalance(
      api,
      azero_stacking_contract,
    );

    const unclaimedRewardsData: any = await getUnclaimedRewardsData(
      api,
      azero_stacking_contract,
    );

    const insufficientInwRewardsAmount =
      +inwInterestBalance - +unclaimedRewardsData?.inw;
    const insufficientAzeroRewardsAmount =
      +azeroInterestBalance - +unclaimedRewardsData?.azero;
    const payableAzero: any = await getPayableAzero(
      api,
      azero_stacking_contract,
    );
    const azeroBalance: any = await getAzeroBalanceOfStakingContract(
      api,
      azero_stacking_contract,
    );
    const azeroStakeBalance: any = await getAzeroStakeBalance(
      api,
      azero_stacking_contract,
    );
    const diffAB = azeroBalance - azeroInterestBalance - azeroStakeBalance;

    let waitingListInfo: any;
    axios
      .post(
        'https://staking-internal.inkwhale.net/getWaitingListInfoWithinExpirationDuration',
        'expirationDuration=1500000',
      )
      .then(response => {
        waitingListInfo = response.data;
      })
      .catch(error => {
        console.error('ERROR: AzeroStacking Admin waitingListInfo', error);
      });
    const insufficientAzeroAmount =
      +payableAzero - (+waitingListInfo?.totalAzero / Math.pow(10, 12) || 0);

    send_telegram_message(
      `<b>Azero stacking status</b>
<b>${+diffAB == 0 ? '' : '🚨'}Diff b/w (A) and (B):</b> <code>${diffAB}</code>\n
Contract Payable Azero Amount
<b>${
        insufficientAzeroAmount > 0 ? 'Excessive' : '🚨Insufficient'
      }Amount</b>: <code>${insufficientAzeroAmount}</code>\n
<b>${
        insufficientInwRewardsAmount > 0 ? 'Excessive' : '🚨Insufficient'
      }</b>: <code>${insufficientInwRewardsAmount}</code> INW\n
<b>${
        insufficientAzeroRewardsAmount > 0 ? 'Excessive' : '🚨Insufficient'
      } AZERO Amount</b>: <code>${insufficientAzeroRewardsAmount}</code> AZERO`,
      process.env.TELEGRAM_ID_CHAT || '',
      process.env.TELEGRAM_AZERO_GROUP_ADMIN_THREAD_ID || '',
    );
  } catch (error) {
    console.log('ERROR: AzeroStacking Admin', error);
  }
}

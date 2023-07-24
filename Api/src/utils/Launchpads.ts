import {ApiPromise} from '@polkadot/api';
import {ContractPromise} from '@polkadot/api-contract';
import {readOnlyGasLimit} from './utils';
import {LaunchpadsSchemaRepository} from '../repositories';
import {global_vars} from '../cronjob/global';
import {launchpad_contract} from '../contracts/launchpad';

export const checkNewLaunchpads = async (
  isTrigger: boolean,
  isCheckAll: boolean,
  api: ApiPromise,
  launchpad_generator_calls: ContractPromise,
  launchpadsSchemaRepository: LaunchpadsSchemaRepository,
): Promise<boolean> => {
  if (!isTrigger) {
    if (global_vars.is_running) {
      console.log('checkNewLaunchpads is running. Do nothing.');
      return false;
    }
    global_vars.is_running = true;
  }
  try {
    let launchpadCount = await execContractQuery(
      api,
      launchpad_generator_calls,
      `${process.env.CALLER_ACCOUNT}`,
      'launchpadGeneratorTrait::getLaunchpadCount',
    );
    let totalPoolDb = (await launchpadsSchemaRepository.count()).count;
    console.log({
      launchpadCount: launchpadCount,
      totalPoolDb: totalPoolDb,
    });

    totalPoolDb = isCheckAll ? 0 : totalPoolDb;
    for (let index = launchpadCount; index > totalPoolDb; index--) {
      let launchpadContract = await execContractQuery(
        api,
        launchpad_generator_calls,
        `${process.env.CALLER_ACCOUNT}`,
        'launchpadGeneratorTrait::getLaunchpadById',
        index,
      );
      console.log('checkNewLaunchpads - launchpadContract', launchpadContract);
      await ProcessLaunchpad(
        api,
        launchpadContract,
        launchpadsSchemaRepository,
      );
    }
    if (!isTrigger) {
      global_vars.is_running = false;
    }
  } catch (e) {
    if (!isTrigger) {
      global_vars.is_running = false;
    }
    console.log(`ERROR: checkNewLaunchpads - ${e.message}`);
    return false;
  }
  return true;
};

export const ProcessLaunchpad = async (
  api: ApiPromise,
  launchpadContract: string,
  launchpadsSchemaRepository: LaunchpadsSchemaRepository,
) => {
  const launchpad_contract_calls = new ContractPromise(
    api,
    launchpad_contract.CONTRACT_ABI,
    launchpadContract,
  );
  let projectInfoUri = await execContractQuery(
    api,
    launchpad_contract_calls,
    `${process.env.CALLER_ACCOUNT}`,
    'launchpadContractTrait::getProjectInfoUri',
  );
  let tokenAddress = await execContractQuery(
    api,
    launchpad_contract_calls,
    `${process.env.CALLER_ACCOUNT}`,
    'launchpadContractTrait::getTokenAddress',
  );
  try {
    let launchpad = await launchpadsSchemaRepository.findOne({
      where: {
        launchpadContract: launchpadContract,
      },
    });
    if (launchpad) {
      try {
        await launchpadsSchemaRepository.updateById(launchpad._id, {
          projectInfoUri: projectInfoUri,
          launchpadContract: launchpadContract,
          tokenContract: tokenAddress,
        });
      } catch (e) {
        console.log(`ERROR: ProcessPool updateById - ${e.message}`);
        return false;
      }
    } else {
      try {
        let create_collection = await launchpadsSchemaRepository.create({
          projectInfoUri: projectInfoUri,
          launchpadContract: launchpadContract,
          tokenContract: tokenAddress,
        });
        console.log({create_collection: create_collection});
      } catch (e) {
        console.log(`ERROR: ProcessPool create - ${e.message}`);
        return false;
      }
    }
  } catch (e) {
    console.log(`ERROR: ProcessPool - ${e.message}`);
    return false;
  }
  return true;
};

export async function execContractQuery(
  api: ApiPromise,
  contract_to_call: ContractPromise,
  caller_account: string,
  queryName: string,
  ...args: any
): Promise<any> {
  if (!contract_to_call) {
    console.log('invalid', contract_to_call);
    return 0;
  }
  if (!caller_account || caller_account?.length == 0) {
    caller_account = `${process.env.CALLER_ACCOUNT}`;
  }
  const gasLimit = readOnlyGasLimit(api);
  const azero_value = 0;
  try {
    const {result, output}: any = await contract_to_call.query[queryName](
      caller_account,
      {value: azero_value, gasLimit: gasLimit},
      ...args,
    );
    if (result.isOk) {
      console.log(output?.toHuman(), queryName);

      return output?.toHuman()?.Ok;
    }
  } catch (error) {
    console.log('@_@ ', queryName, ' error >>', error.message);
  }
}

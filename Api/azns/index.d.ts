import { ApiPromise } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';

type Chain = {
  network: string
  name: string
  rpcUrls: [string, ...string[]]
  ss58Prefix?: number
  testnet?: boolean
}

/**
 * Custom options for `resolveAddressToDomain` and `resolveDomainToAddress`.
 * @param chainId Chain ID to use (default: `alephzero`, available: `alephzero`, `alephzero-testnet`, `development`).
 * @param customApi Custom API instance to use instead of creating the default one (faster and more memory efficient, if you already have an API instance)
 * @param customContractAddresses Custom contract addresses to overwrite the default ones. Mandatory for `development` network.
 * @param debug Enable debug logging.
 */
type ResolveOptions = {
  chainId: SupportedChainIds
  customApi?: ApiPromise
  customContractAddresses?: ContractAddresses
  debug?: boolean
}

/**
 * Supported Chains
 */
declare enum SupportedChainId {
    AlephZero = "alephzero",
    AlephZeroTestnet = "alephzero-testnet",
    Development = "development"
}
/**
 * Chains
 */
declare const alephzero: Chain;
declare const alephzeroTestnet: Chain;
declare const development: Chain;
declare const allChains: Chain[];
/**
 * Supported TLDs
 */
declare enum SupportedTLD {
    AZERO = "azero",
    A0 = "a0",
    TZERO = "tzero"
}
/**
 * Contracts IDs & Addresses
 */
declare enum ContractId {
    Router = "azns_router",
    Registry = "azns_registry",
    FeeCalculator = "azns_fee_calculator",
    MerkleVerifier = "azns_merkle_verifier",
    NameChecker = "azns_name_checker"
}
type ContractAddresses = {
    [_ in ContractId]?: string;
};
declare const CONTRACT_ADDRESSES: {
    [_ in SupportedChainId]?: ContractAddresses;
};

/**
 * Returns supported TLDs for a given chain.
 */
declare const getSupportedTLDs: (chainId: SupportedChainId) => SupportedTLD[];
/**
 * Imports & returns metadata.json (abi) for a given contract.
 */
declare const getContractAbi: (contractId: ContractId) => Promise<any>;
/**
 * Returns contract address for a given chain & contract.
 * If `customContractAddresses` are provided, they will overwrite of the default ones.
 * NOTE: To use the local `development` network, `customContractAddresses` must be provided.
 */
declare const getContractAddress: (chainId: SupportedChainId, contractId: ContractId, customContractAddresses?: ContractAddresses) => string | undefined;
/**
 * Determines contract details based on chain & identifier, then returns a `ContractPromise` instance.
 */
declare const getContract: (api: ApiPromise, chainId: SupportedChainId, contractId: ContractId, customContractAddresses?: ContractAddresses) => Promise<{
    abi: any;
    address: string;
    contract: ContractPromise;
}>;

declare class ErrorBase<T extends string> extends Error {
    name: T;
    message: string;
    cause: any;
    constructor({ name, message, cause }: {
        name: T;
        message: string;
        cause?: any;
    });
}

type ResolveAddressErrorName = 'INVALID_ADDRESS_FORMAT' | 'CONTRACT_ERROR' | 'OTHER_ERROR';
declare class ResolveAddressError extends ErrorBase<ResolveAddressErrorName> {
}
/**
 * Resolves a given address to the assigned primary domain(s).
 * NOTE: When an address holds primary domains within multiple TLDs,
 *       all primary domains will be returned. This case is currently not possible,
 *       so `allPrimaryDomains` will always return an array with 0 or 1 primary domain.
 * @param address Address to resolve (e.g. `5EFJEY4DG2FnzcuCZpnRjjzT4x7heeEXuoYy1yAoUmshEhAP`)
 * @param options Options (see `ResolveOptions` definition)
 * @returns Primary domain(s) as string (null, if no primary domain found) or error
 */
declare const resolveAddressToDomain: (address: string, options?: Partial<ResolveOptions>) => Promise<{
    primaryDomain: string | null;
    allPrimaryDomains: string[];
    error: undefined;
} | {
    primaryDomain: undefined;
    allPrimaryDomains: undefined;
    error: ResolveAddressError;
}>;

type ResolveDomainErrorName = 'UNSUPPORTED_TLD' | 'INVALID_DOMAIN_FORMAT' | 'CONTRACT_ERROR' | 'OTHER_ERROR';
declare class ResolveDomainError extends ErrorBase<ResolveDomainErrorName> {
}
/**
 * Resolves a given domain to the assigned address.
 * @param domain Domain to resolve (e.g. `domains.azero`)
 * @param options Options (see `ResolveOptions` definition)
 * @returns Address as string (null, if domain not found) or error
 */
declare const resolveDomainToAddress: (domain: string, options?: Partial<ResolveOptions>) => Promise<{
    address: string | null;
    error: undefined;
} | {
    address: undefined;
    error: ResolveDomainError;
}>;

export { CONTRACT_ADDRESSES, Chain, ContractAddresses, ContractId, ResolveAddressError, ResolveAddressErrorName, ResolveDomainError, ResolveDomainErrorName, ResolveOptions, SupportedChainId, SupportedTLD, alephzero, alephzeroTestnet, allChains, development, getContract, getContractAbi, getContractAddress, getSupportedTLDs, resolveAddressToDomain, resolveDomainToAddress };

  export function Pe(arg0: string, Pe: any) {
    throw new Error('Function not implemented.');
  }
export const router_contract = {
  CONTRACT_ADDRESS: '',
  CONTRACT_ABI: {
    source: {
      hash: '0xa26faf0d55782969b84f4dce1cc60890e039e75954997ed48218d2e93ec4ff60',
      language: 'ink! 4.3.0',
      compiler: 'rustc 1.72.1',
      build_info: {
        build_mode: 'Release',
        cargo_contract_version: '3.2.0',
        rust_toolchain: 'stable-x86_64-unknown-linux-gnu',
        wasm_opt_settings: {
          keep_debug_symbols: false,
          optimization_passes: 'Z',
        },
      },
    },
    contract: {
      name: 'router_contract',
      version: '0.1.0',
      authors: ['Cardinal Cryptography'],
    },
    spec: {
      constructors: [
        {
          args: [
            {label: 'factory', type: {displayName: ['AccountId'], type: 0}},
            {label: 'wnative', type: {displayName: ['AccountId'], type: 0}},
          ],
          default: false,
          docs: [],
          label: 'new',
          payable: false,
          returnType: {
            displayName: ['ink_primitives', 'ConstructorResult'],
            type: 3,
          },
          selector: '0x9bae9d5e',
        },
      ],
      docs: [],
      environment: {
        accountId: {displayName: ['AccountId'], type: 0},
        balance: {displayName: ['Balance'], type: 7},
        blockNumber: {displayName: ['BlockNumber'], type: 28},
        chainExtension: {displayName: ['ChainExtension'], type: 29},
        hash: {displayName: ['Hash'], type: 27},
        maxEventTopics: 4,
        timestamp: {displayName: ['Timestamp'], type: 8},
      },
      events: [],
      lang_error: {displayName: ['ink', 'LangError'], type: 5},
      messages: [
        {
          args: [],
          default: false,
          docs: [],
          label: 'Router::factory',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 6},
          selector: '0xac3a4c18',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'Router::wnative',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 6},
          selector: '0x5593eab6',
        },
        {
          args: [
            {label: 'token_0', type: {displayName: ['AccountId'], type: 0}},
            {label: 'token_1', type: {displayName: ['AccountId'], type: 0}},
            {label: 'amount_0_desired', type: {displayName: ['u128'], type: 7}},
            {label: 'amount_1_desired', type: {displayName: ['u128'], type: 7}},
            {label: 'amount_0_min', type: {displayName: ['u128'], type: 7}},
            {label: 'amount_1_min', type: {displayName: ['u128'], type: 7}},
            {label: 'to', type: {displayName: ['AccountId'], type: 0}},
            {label: 'deadline', type: {displayName: ['u64'], type: 8}},
          ],
          default: false,
          docs: [],
          label: 'Router::add_liquidity',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 9},
          selector: '0xa5b7d597',
        },
        {
          args: [
            {label: 'token', type: {displayName: ['AccountId'], type: 0}},
            {
              label: 'amount_token_desired',
              type: {displayName: ['u128'], type: 7},
            },
            {label: 'amount_token_min', type: {displayName: ['u128'], type: 7}},
            {
              label: 'amount_native_min',
              type: {displayName: ['Balance'], type: 7},
            },
            {label: 'to', type: {displayName: ['AccountId'], type: 0}},
            {label: 'deadline', type: {displayName: ['u64'], type: 8}},
          ],
          default: false,
          docs: [],
          label: 'Router::add_liquidity_native',
          mutates: true,
          payable: true,
          returnType: {displayName: ['ink', 'MessageResult'], type: 9},
          selector: '0x292d7221',
        },
        {
          args: [
            {label: 'token_0', type: {displayName: ['AccountId'], type: 0}},
            {label: 'token_1', type: {displayName: ['AccountId'], type: 0}},
            {label: 'liquidity', type: {displayName: ['u128'], type: 7}},
            {label: 'amount_0_min', type: {displayName: ['u128'], type: 7}},
            {label: 'amount_1_min', type: {displayName: ['u128'], type: 7}},
            {label: 'to', type: {displayName: ['AccountId'], type: 0}},
            {label: 'deadline', type: {displayName: ['u64'], type: 8}},
          ],
          default: false,
          docs: [],
          label: 'Router::remove_liquidity',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 18},
          selector: '0xd3abe5a3',
        },
        {
          args: [
            {label: 'token', type: {displayName: ['AccountId'], type: 0}},
            {label: 'liquidity', type: {displayName: ['u128'], type: 7}},
            {label: 'amount_token_min', type: {displayName: ['u128'], type: 7}},
            {
              label: 'amount_native_min',
              type: {displayName: ['Balance'], type: 7},
            },
            {label: 'to', type: {displayName: ['AccountId'], type: 0}},
            {label: 'deadline', type: {displayName: ['u64'], type: 8}},
          ],
          default: false,
          docs: [],
          label: 'Router::remove_liquidity_native',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 18},
          selector: '0x3448bb5c',
        },
        {
          args: [
            {label: 'amount_in', type: {displayName: ['u128'], type: 7}},
            {label: 'amount_out_min', type: {displayName: ['u128'], type: 7}},
            {label: 'path', type: {displayName: ['Vec'], type: 21}},
            {label: 'to', type: {displayName: ['AccountId'], type: 0}},
            {label: 'deadline', type: {displayName: ['u64'], type: 8}},
          ],
          default: false,
          docs: [],
          label: 'Router::swap_exact_tokens_for_tokens',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 22},
          selector: '0xaf0a8836',
        },
        {
          args: [
            {label: 'amount_out', type: {displayName: ['u128'], type: 7}},
            {label: 'amount_in_max', type: {displayName: ['u128'], type: 7}},
            {label: 'path', type: {displayName: ['Vec'], type: 21}},
            {label: 'to', type: {displayName: ['AccountId'], type: 0}},
            {label: 'deadline', type: {displayName: ['u64'], type: 8}},
          ],
          default: false,
          docs: [],
          label: 'Router::swap_tokens_for_exact_tokens',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 22},
          selector: '0xd8eafd67',
        },
        {
          args: [
            {label: 'amount_out_min', type: {displayName: ['u128'], type: 7}},
            {label: 'path', type: {displayName: ['Vec'], type: 21}},
            {label: 'to', type: {displayName: ['AccountId'], type: 0}},
            {label: 'deadline', type: {displayName: ['u64'], type: 8}},
          ],
          default: false,
          docs: [],
          label: 'Router::swap_exact_native_for_tokens',
          mutates: true,
          payable: true,
          returnType: {displayName: ['ink', 'MessageResult'], type: 22},
          selector: '0x0a78e251',
        },
        {
          args: [
            {label: 'amount_out', type: {displayName: ['Balance'], type: 7}},
            {label: 'amount_in_max', type: {displayName: ['u128'], type: 7}},
            {label: 'path', type: {displayName: ['Vec'], type: 21}},
            {label: 'to', type: {displayName: ['AccountId'], type: 0}},
            {label: 'deadline', type: {displayName: ['u64'], type: 8}},
          ],
          default: false,
          docs: [],
          label: 'Router::swap_tokens_for_exact_native',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 22},
          selector: '0xb2b28f92',
        },
        {
          args: [
            {label: 'amount_in', type: {displayName: ['u128'], type: 7}},
            {
              label: 'amount_out_min',
              type: {displayName: ['Balance'], type: 7},
            },
            {label: 'path', type: {displayName: ['Vec'], type: 21}},
            {label: 'to', type: {displayName: ['AccountId'], type: 0}},
            {label: 'deadline', type: {displayName: ['u64'], type: 8}},
          ],
          default: false,
          docs: [],
          label: 'Router::swap_exact_tokens_for_native',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 22},
          selector: '0xcb577423',
        },
        {
          args: [
            {label: 'amount_out', type: {displayName: ['u128'], type: 7}},
            {label: 'path', type: {displayName: ['Vec'], type: 21}},
            {label: 'to', type: {displayName: ['AccountId'], type: 0}},
            {label: 'deadline', type: {displayName: ['u64'], type: 8}},
          ],
          default: false,
          docs: [],
          label: 'Router::swap_native_for_exact_tokens',
          mutates: true,
          payable: true,
          returnType: {displayName: ['ink', 'MessageResult'], type: 22},
          selector: '0x1299fdf2',
        },
        {
          args: [
            {label: 'amount_0', type: {displayName: ['u128'], type: 7}},
            {label: 'reserve_0', type: {displayName: ['u128'], type: 7}},
            {label: 'reserve_1', type: {displayName: ['u128'], type: 7}},
          ],
          default: false,
          docs: [
            ' Returns how much of `token_B` tokens should be added',
            ' to the pool to maintain the constant ratio `k = reserve_0 / reserve_1`,',
            ' given `amount_0` of `token_A`.',
          ],
          label: 'Router::quote',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 25},
          selector: '0x16347b10',
        },
        {
          args: [
            {label: 'amount_in', type: {displayName: ['u128'], type: 7}},
            {label: 'reserve_0', type: {displayName: ['u128'], type: 7}},
            {label: 'reserve_1', type: {displayName: ['u128'], type: 7}},
          ],
          default: false,
          docs: [
            ' Returns amount of `B` tokens received',
            ' for `amount_in` of `A` tokens that maintains',
            ' the constant ratio of `k = reserve_0 / reserve_1`.',
          ],
          label: 'Router::get_amount_out',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 25},
          selector: '0x41e315fd',
        },
        {
          args: [
            {label: 'amount_out', type: {displayName: ['u128'], type: 7}},
            {label: 'reserve_0', type: {displayName: ['u128'], type: 7}},
            {label: 'reserve_1', type: {displayName: ['u128'], type: 7}},
          ],
          default: false,
          docs: [
            ' Returns amount of `A` tokens user has to supply',
            ' to get exactly `amount_out` of `B` token while maintaining',
            ' the constant ratio of `k = reserve_0 / reserve_1`.',
          ],
          label: 'Router::get_amount_in',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 25},
          selector: '0xea4ac85d',
        },
        {
          args: [
            {label: 'amount_in', type: {displayName: ['u128'], type: 7}},
            {label: 'path', type: {displayName: ['Vec'], type: 21}},
          ],
          default: false,
          docs: [],
          label: 'Router::get_amounts_out',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 22},
          selector: '0x7170b8f6',
        },
        {
          args: [
            {label: 'amount_out', type: {displayName: ['u128'], type: 7}},
            {label: 'path', type: {displayName: ['Vec'], type: 21}},
          ],
          default: false,
          docs: [],
          label: 'Router::get_amounts_in',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 22},
          selector: '0x707998fc',
        },
      ],
    },
    storage: {
      root: {
        layout: {
          struct: {
            fields: [
              {layout: {leaf: {key: '0x00000000', ty: 0}}, name: 'factory'},
              {layout: {leaf: {key: '0x00000000', ty: 0}}, name: 'wnative'},
            ],
            name: 'RouterContract',
          },
        },
        root_key: '0x00000000',
      },
    },
    types: [
      {
        id: 0,
        type: {
          def: {composite: {fields: [{type: 1, typeName: '[u8; 32]'}]}},
          path: ['ink_primitives', 'types', 'AccountId'],
        },
      },
      {id: 1, type: {def: {array: {len: 32, type: 2}}}},
      {id: 2, type: {def: {primitive: 'u8'}}},
      {
        id: 3,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 4}], index: 0, name: 'Ok'},
                {fields: [{type: 5}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 4},
            {name: 'E', type: 5},
          ],
          path: ['Result'],
        },
      },
      {id: 4, type: {def: {tuple: []}}},
      {
        id: 5,
        type: {
          def: {variant: {variants: [{index: 1, name: 'CouldNotReadInput'}]}},
          path: ['ink_primitives', 'LangError'],
        },
      },
      {
        id: 6,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 0}], index: 0, name: 'Ok'},
                {fields: [{type: 5}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 0},
            {name: 'E', type: 5},
          ],
          path: ['Result'],
        },
      },
      {id: 7, type: {def: {primitive: 'u128'}}},
      {id: 8, type: {def: {primitive: 'u64'}}},
      {
        id: 9,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 10}], index: 0, name: 'Ok'},
                {fields: [{type: 5}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 10},
            {name: 'E', type: 5},
          ],
          path: ['Result'],
        },
      },
      {
        id: 10,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 11}], index: 0, name: 'Ok'},
                {fields: [{type: 12}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 11},
            {name: 'E', type: 12},
          ],
          path: ['Result'],
        },
      },
      {id: 11, type: {def: {tuple: [7, 7, 7]}}},
      {
        id: 12,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [{type: 13, typeName: 'PSP22Error'}],
                  index: 0,
                  name: 'PSP22Error',
                },
                {
                  fields: [{type: 15, typeName: 'FactoryError'}],
                  index: 1,
                  name: 'FactoryError',
                },
                {
                  fields: [{type: 16, typeName: 'PairError'}],
                  index: 2,
                  name: 'PairError',
                },
                {
                  fields: [{type: 5, typeName: 'LangError'}],
                  index: 3,
                  name: 'LangError',
                },
                {
                  fields: [{type: 17, typeName: 'MathError'}],
                  index: 4,
                  name: 'MathError',
                },
                {
                  fields: [{type: 14, typeName: 'String'}],
                  index: 5,
                  name: 'CrossContractCallFailed',
                },
                {index: 6, name: 'Expired'},
                {index: 7, name: 'IdenticalAddresses'},
                {index: 8, name: 'InvalidPath'},
                {index: 9, name: 'PairNotFound'},
                {index: 10, name: 'TransferError'},
                {index: 11, name: 'ExcessiveInputAmount'},
                {index: 12, name: 'InsufficientAmount'},
                {index: 13, name: 'InsufficientOutputAmount'},
                {index: 14, name: 'InsufficientAmountA'},
                {index: 15, name: 'InsufficientAmountB'},
                {index: 16, name: 'InsufficientLiquidity'},
              ],
            },
          },
          path: ['traits', 'router', 'RouterError'],
        },
      },
      {
        id: 13,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [{type: 14, typeName: 'String'}],
                  index: 0,
                  name: 'Custom',
                },
                {index: 1, name: 'InsufficientBalance'},
                {index: 2, name: 'InsufficientAllowance'},
                {index: 3, name: 'ZeroRecipientAddress'},
                {index: 4, name: 'ZeroSenderAddress'},
                {
                  fields: [{type: 14, typeName: 'String'}],
                  index: 5,
                  name: 'SafeTransferCheckFailed',
                },
              ],
            },
          },
          path: ['psp22', 'errors', 'PSP22Error'],
        },
      },
      {id: 14, type: {def: {primitive: 'str'}}},
      {
        id: 15,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [{type: 16, typeName: 'PairError'}],
                  index: 0,
                  name: 'PairError',
                },
                {index: 1, name: 'CallerIsNotFeeSetter'},
                {index: 2, name: 'IdenticalAddresses'},
                {index: 3, name: 'PairExists'},
                {index: 4, name: 'PairInstantiationFailed'},
              ],
            },
          },
          path: ['traits', 'factory', 'FactoryError'],
        },
      },
      {
        id: 16,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [{type: 13, typeName: 'PSP22Error'}],
                  index: 0,
                  name: 'PSP22Error',
                },
                {
                  fields: [{type: 5, typeName: 'LangError'}],
                  index: 1,
                  name: 'LangError',
                },
                {
                  fields: [{type: 17, typeName: 'MathError'}],
                  index: 2,
                  name: 'MathError',
                },
                {index: 3, name: 'KInvariantChanged'},
                {index: 4, name: 'InsufficientLiquidityMinted'},
                {index: 5, name: 'InsufficientLiquidityBurned'},
                {index: 6, name: 'InsufficientOutputAmount'},
                {index: 7, name: 'InsufficientLiquidity'},
                {index: 8, name: 'InsufficientInputAmount'},
                {index: 9, name: 'InvalidTo'},
                {index: 10, name: 'ReservesOverflow'},
              ],
            },
          },
          path: ['traits', 'pair', 'PairError'],
        },
      },
      {
        id: 17,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [{type: 2, typeName: 'u8'}],
                  index: 0,
                  name: 'AddOverflow',
                },
                {
                  fields: [{type: 2, typeName: 'u8'}],
                  index: 1,
                  name: 'CastOverflow',
                },
                {
                  fields: [{type: 2, typeName: 'u8'}],
                  index: 2,
                  name: 'DivByZero',
                },
                {
                  fields: [{type: 2, typeName: 'u8'}],
                  index: 3,
                  name: 'MulOverflow',
                },
                {
                  fields: [{type: 2, typeName: 'u8'}],
                  index: 4,
                  name: 'SubUnderflow',
                },
              ],
            },
          },
          path: ['traits', 'MathError'],
        },
      },
      {
        id: 18,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 19}], index: 0, name: 'Ok'},
                {fields: [{type: 5}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 19},
            {name: 'E', type: 5},
          ],
          path: ['Result'],
        },
      },
      {
        id: 19,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 20}], index: 0, name: 'Ok'},
                {fields: [{type: 12}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 20},
            {name: 'E', type: 12},
          ],
          path: ['Result'],
        },
      },
      {id: 20, type: {def: {tuple: [7, 7]}}},
      {id: 21, type: {def: {sequence: {type: 0}}}},
      {
        id: 22,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 23}], index: 0, name: 'Ok'},
                {fields: [{type: 5}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 23},
            {name: 'E', type: 5},
          ],
          path: ['Result'],
        },
      },
      {
        id: 23,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 24}], index: 0, name: 'Ok'},
                {fields: [{type: 12}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 24},
            {name: 'E', type: 12},
          ],
          path: ['Result'],
        },
      },
      {id: 24, type: {def: {sequence: {type: 7}}}},
      {
        id: 25,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 26}], index: 0, name: 'Ok'},
                {fields: [{type: 5}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 26},
            {name: 'E', type: 5},
          ],
          path: ['Result'],
        },
      },
      {
        id: 26,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 7}], index: 0, name: 'Ok'},
                {fields: [{type: 12}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 7},
            {name: 'E', type: 12},
          ],
          path: ['Result'],
        },
      },
      {
        id: 27,
        type: {
          def: {composite: {fields: [{type: 1, typeName: '[u8; 32]'}]}},
          path: ['ink_primitives', 'types', 'Hash'],
        },
      },
      {id: 28, type: {def: {primitive: 'u32'}}},
      {
        id: 29,
        type: {
          def: {variant: {}},
          path: ['ink_env', 'types', 'NoChainExtension'],
        },
      },
    ],
    version: '4',
  },
};
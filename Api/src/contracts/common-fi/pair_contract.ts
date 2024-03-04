export const pair_contract = {
  CONTRACT_ADDRESS: '',
  CONTRACT_ABI: {
    source: {
      hash: '0x270061c0e21b87cacb19986af98d0ed0a83b5578072ca55062ae786306bda08b',
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
      name: 'pair_contract',
      version: '0.1.0',
      authors: ['Cardinal Cryptography'],
    },
    spec: {
      constructors: [
        {
          args: [
            {label: 'token_0', type: {displayName: ['AccountId'], type: 1}},
            {label: 'token_1', type: {displayName: ['AccountId'], type: 1}},
          ],
          default: false,
          docs: [],
          label: 'new',
          payable: false,
          returnType: {
            displayName: ['ink_primitives', 'ConstructorResult'],
            type: 9,
          },
          selector: '0x9bae9d5e',
        },
      ],
      docs: [],
      environment: {
        accountId: {displayName: ['AccountId'], type: 1},
        balance: {displayName: ['Balance'], type: 0},
        blockNumber: {displayName: ['BlockNumber'], type: 4},
        chainExtension: {displayName: ['ChainExtension'], type: 34},
        hash: {displayName: ['Hash'], type: 33},
        maxEventTopics: 4,
        timestamp: {displayName: ['Timestamp'], type: 8},
      },
      events: [
        {
          args: [
            {
              docs: [],
              indexed: true,
              label: 'sender',
              type: {displayName: ['AccountId'], type: 1},
            },
            {
              docs: [],
              indexed: false,
              label: 'amount_0',
              type: {displayName: ['u128'], type: 0},
            },
            {
              docs: [],
              indexed: false,
              label: 'amount_1',
              type: {displayName: ['u128'], type: 0},
            },
          ],
          docs: [],
          label: 'Mint',
        },
        {
          args: [
            {
              docs: [],
              indexed: true,
              label: 'sender',
              type: {displayName: ['AccountId'], type: 1},
            },
            {
              docs: [],
              indexed: false,
              label: 'amount_0',
              type: {displayName: ['u128'], type: 0},
            },
            {
              docs: [],
              indexed: false,
              label: 'amount_1',
              type: {displayName: ['u128'], type: 0},
            },
            {
              docs: [],
              indexed: true,
              label: 'to',
              type: {displayName: ['AccountId'], type: 1},
            },
          ],
          docs: [],
          label: 'Burn',
        },
        {
          args: [
            {
              docs: [],
              indexed: true,
              label: 'sender',
              type: {displayName: ['AccountId'], type: 1},
            },
            {
              docs: [],
              indexed: false,
              label: 'amount_0_in',
              type: {displayName: ['u128'], type: 0},
            },
            {
              docs: [],
              indexed: false,
              label: 'amount_1_in',
              type: {displayName: ['u128'], type: 0},
            },
            {
              docs: [],
              indexed: false,
              label: 'amount_0_out',
              type: {displayName: ['u128'], type: 0},
            },
            {
              docs: [],
              indexed: false,
              label: 'amount_1_out',
              type: {displayName: ['u128'], type: 0},
            },
            {
              docs: [],
              indexed: true,
              label: 'to',
              type: {displayName: ['AccountId'], type: 1},
            },
          ],
          docs: [],
          label: 'Swap',
        },
        {
          args: [
            {
              docs: [],
              indexed: false,
              label: 'reserve_0',
              type: {displayName: ['u128'], type: 0},
            },
            {
              docs: [],
              indexed: false,
              label: 'reserve_1',
              type: {displayName: ['u128'], type: 0},
            },
          ],
          docs: [],
          label: 'Sync',
        },
        {
          args: [
            {
              docs: [],
              indexed: true,
              label: 'from',
              type: {displayName: ['Option'], type: 32},
            },
            {
              docs: [],
              indexed: true,
              label: 'to',
              type: {displayName: ['Option'], type: 32},
            },
            {
              docs: [],
              indexed: false,
              label: 'value',
              type: {displayName: ['u128'], type: 0},
            },
          ],
          docs: [],
          label: 'Transfer',
        },
        {
          args: [
            {
              docs: [],
              indexed: true,
              label: 'owner',
              type: {displayName: ['AccountId'], type: 1},
            },
            {
              docs: [],
              indexed: true,
              label: 'spender',
              type: {displayName: ['AccountId'], type: 1},
            },
            {
              docs: [],
              indexed: false,
              label: 'amount',
              type: {displayName: ['u128'], type: 0},
            },
          ],
          docs: [],
          label: 'Approval',
        },
      ],
      lang_error: {displayName: ['ink', 'LangError'], type: 11},
      messages: [
        {
          args: [],
          default: false,
          docs: [],
          label: 'Pair::get_factory',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 12},
          selector: '0xd9d97b06',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'Pair::get_minimum_liquidity',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 13},
          selector: '0x4531c469',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'Pair::get_reserves',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 14},
          selector: '0x5a21e3fc',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'Pair::price_0_cumulative_last',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 16},
          selector: '0xf4d99951',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'Pair::price_1_cumulative_last',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 16},
          selector: '0x1dd38d52',
        },
        {
          args: [{label: 'to', type: {displayName: ['AccountId'], type: 1}}],
          default: false,
          docs: [],
          label: 'Pair::mint',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 17},
          selector: '0x4eaaf722',
        },
        {
          args: [{label: 'to', type: {displayName: ['AccountId'], type: 1}}],
          default: false,
          docs: [],
          label: 'Pair::burn',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 23},
          selector: '0x0221c524',
        },
        {
          args: [
            {label: 'amount_0_out', type: {displayName: ['u128'], type: 0}},
            {label: 'amount_1_out', type: {displayName: ['u128'], type: 0}},
            {label: 'to', type: {displayName: ['AccountId'], type: 1}},
            {label: 'data', type: {displayName: ['Option'], type: 26}},
          ],
          default: false,
          docs: [],
          label: 'Pair::swap',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 28},
          selector: '0xc4b60ed8',
        },
        {
          args: [{label: 'to', type: {displayName: ['AccountId'], type: 1}}],
          default: false,
          docs: [],
          label: 'Pair::skim',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 28},
          selector: '0x51c32781',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'Pair::sync',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 28},
          selector: '0x79261d93',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'Pair::get_token_0',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 12},
          selector: '0x7aeb98a8',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'Pair::get_token_1',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 12},
          selector: '0xa5b0616f',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'PSP22::total_supply',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 13},
          selector: '0x162df8c2',
        },
        {
          args: [{label: 'owner', type: {displayName: ['AccountId'], type: 1}}],
          default: false,
          docs: [],
          label: 'PSP22::balance_of',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 13},
          selector: '0x6568382f',
        },
        {
          args: [
            {label: 'owner', type: {displayName: ['AccountId'], type: 1}},
            {label: 'spender', type: {displayName: ['AccountId'], type: 1}},
          ],
          default: false,
          docs: [],
          label: 'PSP22::allowance',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 13},
          selector: '0x4d47d921',
        },
        {
          args: [
            {label: 'to', type: {displayName: ['AccountId'], type: 1}},
            {label: 'value', type: {displayName: ['u128'], type: 0}},
            {label: '_data', type: {displayName: ['Vec'], type: 27}},
          ],
          default: false,
          docs: [],
          label: 'PSP22::transfer',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 30},
          selector: '0xdb20f9f5',
        },
        {
          args: [
            {label: 'from', type: {displayName: ['AccountId'], type: 1}},
            {label: 'to', type: {displayName: ['AccountId'], type: 1}},
            {label: 'value', type: {displayName: ['u128'], type: 0}},
            {label: '_data', type: {displayName: ['Vec'], type: 27}},
          ],
          default: false,
          docs: [],
          label: 'PSP22::transfer_from',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 30},
          selector: '0x54b3c76e',
        },
        {
          args: [
            {label: 'spender', type: {displayName: ['AccountId'], type: 1}},
            {label: 'value', type: {displayName: ['u128'], type: 0}},
          ],
          default: false,
          docs: [],
          label: 'PSP22::approve',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 30},
          selector: '0xb20f1bbd',
        },
        {
          args: [
            {label: 'spender', type: {displayName: ['AccountId'], type: 1}},
            {label: 'delta_value', type: {displayName: ['u128'], type: 0}},
          ],
          default: false,
          docs: [],
          label: 'PSP22::increase_allowance',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 30},
          selector: '0x96d6b57a',
        },
        {
          args: [
            {label: 'spender', type: {displayName: ['AccountId'], type: 1}},
            {label: 'delta_value', type: {displayName: ['u128'], type: 0}},
          ],
          default: false,
          docs: [],
          label: 'PSP22::decrease_allowance',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 30},
          selector: '0xfecb57d5',
        },
      ],
    },
    storage: {
      root: {
        layout: {
          struct: {
            fields: [
              {
                layout: {
                  struct: {
                    fields: [
                      {
                        layout: {leaf: {key: '0x00000000', ty: 0}},
                        name: 'total_supply',
                      },
                      {
                        layout: {
                          root: {
                            layout: {leaf: {key: '0x45c746d4', ty: 0}},
                            root_key: '0x45c746d4',
                          },
                        },
                        name: 'balances',
                      },
                      {
                        layout: {
                          root: {
                            layout: {leaf: {key: '0x00efb3a1', ty: 0}},
                            root_key: '0x00efb3a1',
                          },
                        },
                        name: 'allowances',
                      },
                    ],
                    name: 'PSP22Data',
                  },
                },
                name: 'psp22',
              },
              {
                layout: {
                  struct: {
                    fields: [
                      {
                        layout: {leaf: {key: '0x00000000', ty: 1}},
                        name: 'factory',
                      },
                      {
                        layout: {leaf: {key: '0x00000000', ty: 1}},
                        name: 'token_0',
                      },
                      {
                        layout: {leaf: {key: '0x00000000', ty: 1}},
                        name: 'token_1',
                      },
                      {
                        layout: {leaf: {key: '0x00000000', ty: 0}},
                        name: 'reserve_0',
                      },
                      {
                        layout: {leaf: {key: '0x00000000', ty: 0}},
                        name: 'reserve_1',
                      },
                      {
                        layout: {leaf: {key: '0x00000000', ty: 4}},
                        name: 'block_timestamp_last',
                      },
                      {
                        layout: {leaf: {key: '0x00000000', ty: 5}},
                        name: 'price_0_cumulative_last',
                      },
                      {
                        layout: {leaf: {key: '0x00000000', ty: 5}},
                        name: 'price_1_cumulative_last',
                      },
                      {
                        layout: {
                          enum: {
                            dispatchKey: '0x00000000',
                            name: 'Option',
                            variants: {
                              '0': {fields: [], name: 'None'},
                              '1': {
                                fields: [
                                  {
                                    layout: {leaf: {key: '0x00000000', ty: 5}},
                                    name: '0',
                                  },
                                ],
                                name: 'Some',
                              },
                            },
                          },
                        },
                        name: 'k_last',
                      },
                    ],
                    name: 'PairData',
                  },
                },
                name: 'pair',
              },
            ],
            name: 'PairContract',
          },
        },
        root_key: '0x00000000',
      },
    },
    types: [
      {id: 0, type: {def: {primitive: 'u128'}}},
      {
        id: 1,
        type: {
          def: {composite: {fields: [{type: 2, typeName: '[u8; 32]'}]}},
          path: ['ink_primitives', 'types', 'AccountId'],
        },
      },
      {id: 2, type: {def: {array: {len: 32, type: 3}}}},
      {id: 3, type: {def: {primitive: 'u8'}}},
      {id: 4, type: {def: {primitive: 'u32'}}},
      {
        id: 5,
        type: {
          def: {composite: {fields: [{type: 6, typeName: 'U256'}]}},
          path: ['amm_helpers', 'types', 'WrappedU256'],
        },
      },
      {
        id: 6,
        type: {
          def: {composite: {fields: [{type: 7, typeName: '[u64; 4]'}]}},
          path: ['primitive_types', 'U256'],
        },
      },
      {id: 7, type: {def: {array: {len: 4, type: 8}}}},
      {id: 8, type: {def: {primitive: 'u64'}}},
      {
        id: 9,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 10}], index: 0, name: 'Ok'},
                {fields: [{type: 11}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 10},
            {name: 'E', type: 11},
          ],
          path: ['Result'],
        },
      },
      {id: 10, type: {def: {tuple: []}}},
      {
        id: 11,
        type: {
          def: {variant: {variants: [{index: 1, name: 'CouldNotReadInput'}]}},
          path: ['ink_primitives', 'LangError'],
        },
      },
      {
        id: 12,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 1}], index: 0, name: 'Ok'},
                {fields: [{type: 11}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 1},
            {name: 'E', type: 11},
          ],
          path: ['Result'],
        },
      },
      {
        id: 13,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 0}], index: 0, name: 'Ok'},
                {fields: [{type: 11}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 0},
            {name: 'E', type: 11},
          ],
          path: ['Result'],
        },
      },
      {
        id: 14,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 15}], index: 0, name: 'Ok'},
                {fields: [{type: 11}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 15},
            {name: 'E', type: 11},
          ],
          path: ['Result'],
        },
      },
      {id: 15, type: {def: {tuple: [0, 0, 4]}}},
      {
        id: 16,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 5}], index: 0, name: 'Ok'},
                {fields: [{type: 11}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 5},
            {name: 'E', type: 11},
          ],
          path: ['Result'],
        },
      },
      {
        id: 17,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 18}], index: 0, name: 'Ok'},
                {fields: [{type: 11}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 18},
            {name: 'E', type: 11},
          ],
          path: ['Result'],
        },
      },
      {
        id: 18,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 0}], index: 0, name: 'Ok'},
                {fields: [{type: 19}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 0},
            {name: 'E', type: 19},
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
                {
                  fields: [{type: 20, typeName: 'PSP22Error'}],
                  index: 0,
                  name: 'PSP22Error',
                },
                {
                  fields: [{type: 11, typeName: 'LangError'}],
                  index: 1,
                  name: 'LangError',
                },
                {
                  fields: [{type: 22, typeName: 'MathError'}],
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
        id: 20,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [{type: 21, typeName: 'String'}],
                  index: 0,
                  name: 'Custom',
                },
                {index: 1, name: 'InsufficientBalance'},
                {index: 2, name: 'InsufficientAllowance'},
                {index: 3, name: 'ZeroRecipientAddress'},
                {index: 4, name: 'ZeroSenderAddress'},
                {
                  fields: [{type: 21, typeName: 'String'}],
                  index: 5,
                  name: 'SafeTransferCheckFailed',
                },
              ],
            },
          },
          path: ['psp22', 'errors', 'PSP22Error'],
        },
      },
      {id: 21, type: {def: {primitive: 'str'}}},
      {
        id: 22,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [{type: 3, typeName: 'u8'}],
                  index: 0,
                  name: 'AddOverflow',
                },
                {
                  fields: [{type: 3, typeName: 'u8'}],
                  index: 1,
                  name: 'CastOverflow',
                },
                {
                  fields: [{type: 3, typeName: 'u8'}],
                  index: 2,
                  name: 'DivByZero',
                },
                {
                  fields: [{type: 3, typeName: 'u8'}],
                  index: 3,
                  name: 'MulOverflow',
                },
                {
                  fields: [{type: 3, typeName: 'u8'}],
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
        id: 23,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 24}], index: 0, name: 'Ok'},
                {fields: [{type: 11}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 24},
            {name: 'E', type: 11},
          ],
          path: ['Result'],
        },
      },
      {
        id: 24,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 25}], index: 0, name: 'Ok'},
                {fields: [{type: 19}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 25},
            {name: 'E', type: 19},
          ],
          path: ['Result'],
        },
      },
      {id: 25, type: {def: {tuple: [0, 0]}}},
      {
        id: 26,
        type: {
          def: {
            variant: {
              variants: [
                {index: 0, name: 'None'},
                {fields: [{type: 27}], index: 1, name: 'Some'},
              ],
            },
          },
          params: [{name: 'T', type: 27}],
          path: ['Option'],
        },
      },
      {id: 27, type: {def: {sequence: {type: 3}}}},
      {
        id: 28,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 29}], index: 0, name: 'Ok'},
                {fields: [{type: 11}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 29},
            {name: 'E', type: 11},
          ],
          path: ['Result'],
        },
      },
      {
        id: 29,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 10}], index: 0, name: 'Ok'},
                {fields: [{type: 19}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 10},
            {name: 'E', type: 19},
          ],
          path: ['Result'],
        },
      },
      {
        id: 30,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 31}], index: 0, name: 'Ok'},
                {fields: [{type: 11}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 31},
            {name: 'E', type: 11},
          ],
          path: ['Result'],
        },
      },
      {
        id: 31,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 10}], index: 0, name: 'Ok'},
                {fields: [{type: 20}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 10},
            {name: 'E', type: 20},
          ],
          path: ['Result'],
        },
      },
      {
        id: 32,
        type: {
          def: {
            variant: {
              variants: [
                {index: 0, name: 'None'},
                {fields: [{type: 1}], index: 1, name: 'Some'},
              ],
            },
          },
          params: [{name: 'T', type: 1}],
          path: ['Option'],
        },
      },
      {
        id: 33,
        type: {
          def: {composite: {fields: [{type: 2, typeName: '[u8; 32]'}]}},
          path: ['ink_primitives', 'types', 'Hash'],
        },
      },
      {
        id: 34,
        type: {
          def: {variant: {}},
          path: ['ink_env', 'types', 'NoChainExtension'],
        },
      },
    ],
    version: '4',
  },
};

export const factory_contract = {
  CONTRACT_ADDRESS: '',
  CONTRACT_ABI: {
    source: {
      hash: '0xed5873279c85ecff7d7352d5e5a3baf326dfa6dd932e72823e33056b0fdb84d1',
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
      name: 'factory_contract',
      version: '0.1.0',
      authors: ['Cardinal Cryptography'],
    },
    spec: {
      constructors: [
        {
          args: [
            {
              label: 'fee_to_setter',
              type: {displayName: ['AccountId'], type: 0},
            },
            {label: 'pair_code_hash', type: {displayName: ['Hash'], type: 4}},
          ],
          default: false,
          docs: [],
          label: 'new',
          payable: false,
          returnType: {
            displayName: ['ink_primitives', 'ConstructorResult'],
            type: 5,
          },
          selector: '0x9bae9d5e',
        },
      ],
      docs: [],
      environment: {
        accountId: {displayName: ['AccountId'], type: 0},
        balance: {displayName: ['Balance'], type: 22},
        blockNumber: {displayName: ['BlockNumber'], type: 23},
        chainExtension: {displayName: ['ChainExtension'], type: 24},
        hash: {displayName: ['Hash'], type: 4},
        maxEventTopics: 4,
        timestamp: {displayName: ['Timestamp'], type: 3},
      },
      events: [
        {
          args: [
            {
              docs: [],
              indexed: true,
              label: 'token_0',
              type: {displayName: ['AccountId'], type: 0},
            },
            {
              docs: [],
              indexed: true,
              label: 'token_1',
              type: {displayName: ['AccountId'], type: 0},
            },
            {
              docs: [],
              indexed: false,
              label: 'pair',
              type: {displayName: ['AccountId'], type: 0},
            },
            {
              docs: [],
              indexed: false,
              label: 'pair_len',
              type: {displayName: ['u64'], type: 3},
            },
          ],
          docs: [],
          label: 'PairCreated',
        },
      ],
      lang_error: {displayName: ['ink', 'LangError'], type: 7},
      messages: [
        {
          args: [{label: 'pid', type: {displayName: ['u64'], type: 3}}],
          default: false,
          docs: [],
          label: 'Factory::all_pairs',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 8},
          selector: '0x8101c257',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'Factory::all_pairs_length',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 10},
          selector: '0xf92dcc3f',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'Factory::pair_contract_code_hash',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 11},
          selector: '0x20be58a3',
        },
        {
          args: [
            {label: 'token_0', type: {displayName: ['AccountId'], type: 0}},
            {label: 'token_1', type: {displayName: ['AccountId'], type: 0}},
          ],
          default: false,
          docs: [],
          label: 'Factory::create_pair',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 12},
          selector: '0xc77f4b02',
        },
        {
          args: [
            {label: 'fee_to', type: {displayName: ['AccountId'], type: 0}},
          ],
          default: false,
          docs: [],
          label: 'Factory::set_fee_to',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 19},
          selector: '0x3ef205a7',
        },
        {
          args: [
            {
              label: 'fee_to_setter',
              type: {displayName: ['AccountId'], type: 0},
            },
          ],
          default: false,
          docs: [],
          label: 'Factory::set_fee_to_setter',
          mutates: true,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 19},
          selector: '0x80999559',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'Factory::fee_to',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 8},
          selector: '0xd68332f3',
        },
        {
          args: [],
          default: false,
          docs: [],
          label: 'Factory::fee_to_setter',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 21},
          selector: '0x9d08e711',
        },
        {
          args: [
            {label: 'token_0', type: {displayName: ['AccountId'], type: 0}},
            {label: 'token_1', type: {displayName: ['AccountId'], type: 0}},
          ],
          default: false,
          docs: [],
          label: 'Factory::get_pair',
          mutates: false,
          payable: false,
          returnType: {displayName: ['ink', 'MessageResult'], type: 8},
          selector: '0x45a3c0f6',
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
                  root: {
                    layout: {leaf: {key: '0x02dd46e1', ty: 0}},
                    root_key: '0x02dd46e1',
                  },
                },
                name: 'get_pair',
              },
              {
                layout: {
                  root: {
                    layout: {leaf: {key: '0x0289e68b', ty: 0}},
                    root_key: '0x0289e68b',
                  },
                },
                name: 'all_pairs',
              },
              {
                layout: {leaf: {key: '0x00000000', ty: 3}},
                name: 'all_pairs_length',
              },
              {
                layout: {leaf: {key: '0x00000000', ty: 4}},
                name: 'pair_contract_code_hash',
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
                            layout: {leaf: {key: '0x00000000', ty: 0}},
                            name: '0',
                          },
                        ],
                        name: 'Some',
                      },
                    },
                  },
                },
                name: 'fee_to',
              },
              {
                layout: {leaf: {key: '0x00000000', ty: 0}},
                name: 'fee_to_setter',
              },
            ],
            name: 'FactoryContract',
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
      {id: 3, type: {def: {primitive: 'u64'}}},
      {
        id: 4,
        type: {
          def: {composite: {fields: [{type: 1, typeName: '[u8; 32]'}]}},
          path: ['ink_primitives', 'types', 'Hash'],
        },
      },
      {
        id: 5,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 6}], index: 0, name: 'Ok'},
                {fields: [{type: 7}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 6},
            {name: 'E', type: 7},
          ],
          path: ['Result'],
        },
      },
      {id: 6, type: {def: {tuple: []}}},
      {
        id: 7,
        type: {
          def: {variant: {variants: [{index: 1, name: 'CouldNotReadInput'}]}},
          path: ['ink_primitives', 'LangError'],
        },
      },
      {
        id: 8,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 9}], index: 0, name: 'Ok'},
                {fields: [{type: 7}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 9},
            {name: 'E', type: 7},
          ],
          path: ['Result'],
        },
      },
      {
        id: 9,
        type: {
          def: {
            variant: {
              variants: [
                {index: 0, name: 'None'},
                {fields: [{type: 0}], index: 1, name: 'Some'},
              ],
            },
          },
          params: [{name: 'T', type: 0}],
          path: ['Option'],
        },
      },
      {
        id: 10,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 3}], index: 0, name: 'Ok'},
                {fields: [{type: 7}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 3},
            {name: 'E', type: 7},
          ],
          path: ['Result'],
        },
      },
      {
        id: 11,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 4}], index: 0, name: 'Ok'},
                {fields: [{type: 7}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 4},
            {name: 'E', type: 7},
          ],
          path: ['Result'],
        },
      },
      {
        id: 12,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 13}], index: 0, name: 'Ok'},
                {fields: [{type: 7}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 13},
            {name: 'E', type: 7},
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
                {fields: [{type: 14}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 0},
            {name: 'E', type: 14},
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
                {
                  fields: [{type: 15, typeName: 'PairError'}],
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
        id: 15,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [{type: 16, typeName: 'PSP22Error'}],
                  index: 0,
                  name: 'PSP22Error',
                },
                {
                  fields: [{type: 7, typeName: 'LangError'}],
                  index: 1,
                  name: 'LangError',
                },
                {
                  fields: [{type: 18, typeName: 'MathError'}],
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
        id: 16,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [{type: 17, typeName: 'String'}],
                  index: 0,
                  name: 'Custom',
                },
                {index: 1, name: 'InsufficientBalance'},
                {index: 2, name: 'InsufficientAllowance'},
                {index: 3, name: 'ZeroRecipientAddress'},
                {index: 4, name: 'ZeroSenderAddress'},
                {
                  fields: [{type: 17, typeName: 'String'}],
                  index: 5,
                  name: 'SafeTransferCheckFailed',
                },
              ],
            },
          },
          path: ['psp22', 'errors', 'PSP22Error'],
        },
      },
      {id: 17, type: {def: {primitive: 'str'}}},
      {
        id: 18,
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
        id: 19,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 20}], index: 0, name: 'Ok'},
                {fields: [{type: 7}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 20},
            {name: 'E', type: 7},
          ],
          path: ['Result'],
        },
      },
      {
        id: 20,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 6}], index: 0, name: 'Ok'},
                {fields: [{type: 14}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 6},
            {name: 'E', type: 14},
          ],
          path: ['Result'],
        },
      },
      {
        id: 21,
        type: {
          def: {
            variant: {
              variants: [
                {fields: [{type: 0}], index: 0, name: 'Ok'},
                {fields: [{type: 7}], index: 1, name: 'Err'},
              ],
            },
          },
          params: [
            {name: 'T', type: 0},
            {name: 'E', type: 7},
          ],
          path: ['Result'],
        },
      },
      {id: 22, type: {def: {primitive: 'u128'}}},
      {id: 23, type: {def: {primitive: 'u32'}}},
      {
        id: 24,
        type: {
          def: {variant: {}},
          path: ['ink_env', 'types', 'NoChainExtension'],
        },
      },
    ],
    version: '4',
  },
};

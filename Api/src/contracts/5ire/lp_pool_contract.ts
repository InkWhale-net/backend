const lp_pool_contract = {
  CONTRACT_ADDRESS: "5CzQe664mQn2FBQsvquqyQrezuN9NiYppTbH4biAUfN4mA1g",
  CONTRACT_ABI: {
    "source": {
      "hash": "0xac62304e2e708f12596e2a7b9d8bc3d361c68791ebab62865339375f9d769281",
      "language": "ink! 4.3.0",
      "compiler": "rustc 1.77.0-nightly",
      "build_info": {
        "build_mode": "Debug",
        "cargo_contract_version": "3.2.0",
        "rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
        "wasm_opt_settings": {
          "keep_debug_symbols": false,
          "optimization_passes": "Z"
        }
      }
    },
    "contract": {
      "name": "my_lp_pool",
      "version": "0.1.0",
      "authors": [
        "Support <contact@artzero.io>"
      ]
    },
    "spec": {
      "constructors": [
        {
          "args": [
            {
              "label": "contract_owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "inw_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "lp_contract_address",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "psp22_contract_address",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "max_staking_amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 3
              }
            },
            {
              "label": "multiplier",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 3
              }
            },
            {
              "label": "duration",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 4
              }
            },
            {
              "label": "start_time",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 4
              }
            },
            {
              "label": "unstake_fee",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 3
              }
            }
          ],
          "default": false,
          "docs": [],
          "label": "new",
          "payable": false,
          "returnType": {
            "displayName": [
              "ink_primitives",
              "ConstructorResult"
            ],
            "type": 7
          },
          "selector": "0x9bae9d5e"
        }
      ],
      "docs": [],
      "environment": {
        "accountId": {
          "displayName": [
            "AccountId"
          ],
          "type": 0
        },
        "balance": {
          "displayName": [
            "Balance"
          ],
          "type": 3
        },
        "blockNumber": {
          "displayName": [
            "BlockNumber"
          ],
          "type": 31
        },
        "chainExtension": {
          "displayName": [
            "ChainExtension"
          ],
          "type": 32
        },
        "hash": {
          "displayName": [
            "Hash"
          ],
          "type": 30
        },
        "maxEventTopics": 4,
        "timestamp": {
          "displayName": [
            "Timestamp"
          ],
          "type": 4
        }
      },
      "events": [
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "pool_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "staking_token_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "reward_token_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "staker",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "LpPoolStakeEvent"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "pool_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "staking_token_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "reward_token_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "staker",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "LpPoolUnstakeEvent"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": false,
              "label": "pool_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "staking_token_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "reward_token_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "staker",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "LpPoolClaimEvent"
        }
      ],
      "lang_error": {
        "displayName": [
          "ink",
          "LangError"
        ],
        "type": 16
      },
      "messages": [
        {
          "args": [
            {
              "label": "inw_contract",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "lp_contract_address",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "psp22_contract_address",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            },
            {
              "label": "max_staking_amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 3
              }
            },
            {
              "label": "multiplier",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 3
              }
            },
            {
              "label": "duration",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 4
              }
            },
            {
              "label": "start_time",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 4
              }
            },
            {
              "label": "unstake_fee",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 3
              }
            }
          ],
          "default": false,
          "docs": [],
          "label": "initialize",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 7
          },
          "selector": "0xf2f6dba3"
        },
        {
          "args": [
            {
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 3
              }
            }
          ],
          "default": false,
          "docs": [],
          "label": "stake",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 7
          },
          "selector": "0x5adb38de"
        },
        {
          "args": [
            {
              "label": "amount",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 3
              }
            }
          ],
          "default": false,
          "docs": [],
          "label": "unstake",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 7
          },
          "selector": "0x82364901"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "claim_reward",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 7
          },
          "selector": "0x9a8353a7"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "lp_contract_address",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 17
          },
          "selector": "0xa3cf1453"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::staking_contract_address",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 17
          },
          "selector": "0xb22a7a83"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::psp22_contract_address",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 17
          },
          "selector": "0x0da3be06"
        },
        {
          "args": [
            {
              "label": "staker",
              "type": {
                "displayName": [
                  "genericpoolcontracttrait_external",
                  "GetStakeInfoInput1"
                ],
                "type": 0
              }
            }
          ],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::get_stake_info",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 18
          },
          "selector": "0x7d91f5c8"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::min_reward_amount",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 21
          },
          "selector": "0x57057db9"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::total_staked",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 21
          },
          "selector": "0x6d230adf"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::total_unclaimed_reward",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 21
          },
          "selector": "0x16231caf"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::unstake_fee",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 21
          },
          "selector": "0xc74b547f"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::start_time",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 22
          },
          "selector": "0xc48cf63e"
        },
        {
          "args": [
            {
              "label": "inw_contract",
              "type": {
                "displayName": [
                  "genericpoolcontracttrait_external",
                  "SetInwContractInput1"
                ],
                "type": 0
              }
            }
          ],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::set_inw_contract",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 7
          },
          "selector": "0xb89c001e"
        },
        {
          "args": [
            {
              "label": "amount",
              "type": {
                "displayName": [
                  "genericpoolcontracttrait_external",
                  "WithdrawRewardPoolInput1"
                ],
                "type": 3
              }
            }
          ],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::withdraw_reward_pool",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 7
          },
          "selector": "0x7be928b9"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::inw_contract",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 17
          },
          "selector": "0xf96ce121"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::reward_pool",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 21
          },
          "selector": "0xfc6c3a08"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::duration",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 22
          },
          "selector": "0xec96d641"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::multiplier",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 21
          },
          "selector": "0xfb1ecf6a"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::is_topup_enough_reward",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 23
          },
          "selector": "0x7663de4d"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::max_staking_amount",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 21
          },
          "selector": "0x11fd5b2b"
        },
        {
          "args": [
            {
              "label": "amount",
              "type": {
                "displayName": [
                  "genericpoolcontracttrait_external",
                  "TopupRewardPoolInput1"
                ],
                "type": 3
              }
            }
          ],
          "default": false,
          "docs": [],
          "label": "GenericPoolContractTrait::topup_reward_pool",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 7
          },
          "selector": "0xaaa53e1a"
        },
        {
          "args": [
            {
              "label": "value",
              "type": {
                "displayName": [
                  "admintrait_external",
                  "WithdrawFeeInput1"
                ],
                "type": 3
              }
            },
            {
              "label": "receiver",
              "type": {
                "displayName": [
                  "admintrait_external",
                  "WithdrawFeeInput2"
                ],
                "type": 0
              }
            }
          ],
          "default": false,
          "docs": [
            " This function allows contract owner to withdraw contract balance to his account."
          ],
          "label": "AdminTrait::withdraw_fee",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 7
          },
          "selector": "0x07573e99"
        },
        {
          "args": [],
          "default": false,
          "docs": [
            " Get Azero balance"
          ],
          "label": "AdminTrait::get_balance",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 24
          },
          "selector": "0xc4360570"
        },
        {
          "args": [
            {
              "label": "psp22_contract_address",
              "type": {
                "displayName": [
                  "admintrait_external",
                  "TranferPsp22Input1"
                ],
                "type": 0
              }
            },
            {
              "label": "amount",
              "type": {
                "displayName": [
                  "admintrait_external",
                  "TranferPsp22Input2"
                ],
                "type": 3
              }
            },
            {
              "label": "receiver",
              "type": {
                "displayName": [
                  "admintrait_external",
                  "TranferPsp22Input3"
                ],
                "type": 0
              }
            }
          ],
          "default": false,
          "docs": [
            " This function allow contract owner withdraw PSP22 to an account in case there is any token sent to contract by mistake"
          ],
          "label": "AdminTrait::tranfer_psp22",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 7
          },
          "selector": "0xd9aad284"
        },
        {
          "args": [
            {
              "label": "code_hash",
              "type": {
                "displayName": [
                  "upgradeabletrait_external",
                  "SetCodeInput1"
                ],
                "type": 1
              }
            }
          ],
          "default": false,
          "docs": [
            " This function allow contract owner modifies the code which is used to execute calls to this contract address (`AccountId`)."
          ],
          "label": "UpgradeableTrait::set_code",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 7
          },
          "selector": "0x9e32fab2"
        },
        {
          "args": [
            {
              "label": "new_owner",
              "type": {
                "displayName": [
                  "ownable_external",
                  "TransferOwnershipInput1"
                ],
                "type": 0
              }
            }
          ],
          "default": false,
          "docs": [],
          "label": "Ownable::transfer_ownership",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 26
          },
          "selector": "0x11f43efd"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "Ownable::owner",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 28
          },
          "selector": "0x4fa43c8c"
        },
        {
          "args": [],
          "default": false,
          "docs": [],
          "label": "Ownable::renounce_ownership",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 26
          },
          "selector": "0x5e228753"
        }
      ]
    },
    "storage": {
      "root": {
        "layout": {
          "struct": {
            "fields": [
              {
                "layout": {
                  "struct": {
                    "fields": [
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "enum": {
                                "dispatchKey": "0x6f713913",
                                "name": "Option",
                                "variants": {
                                  "0": {
                                    "fields": [],
                                    "name": "None"
                                  },
                                  "1": {
                                    "fields": [
                                      {
                                        "layout": {
                                          "leaf": {
                                            "key": "0x6f713913",
                                            "ty": 0
                                          }
                                        },
                                        "name": "0"
                                      }
                                    ],
                                    "name": "Some"
                                  }
                                }
                              }
                            },
                            "root_key": "0x6f713913"
                          }
                        },
                        "name": "owner"
                      }
                    ],
                    "name": "Data"
                  }
                },
                "name": "ownable"
              },
              {
                "layout": {
                  "struct": {
                    "fields": [
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 0
                          }
                        },
                        "name": "staking_contract_address"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 0
                          }
                        },
                        "name": "psp22_contract_address"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 0
                          }
                        },
                        "name": "inw_contract"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 3
                          }
                        },
                        "name": "multiplier"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "struct": {
                                "fields": [
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0x90bcab86",
                                        "ty": 4
                                      }
                                    },
                                    "name": "last_reward_update"
                                  },
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0x90bcab86",
                                        "ty": 3
                                      }
                                    },
                                    "name": "staked_value"
                                  },
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0x90bcab86",
                                        "ty": 3
                                      }
                                    },
                                    "name": "unclaimed_reward"
                                  },
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0x90bcab86",
                                        "ty": 3
                                      }
                                    },
                                    "name": "future_reward"
                                  }
                                ],
                                "name": "StakeInformation"
                              }
                            },
                            "root_key": "0x90bcab86"
                          }
                        },
                        "name": "stakers"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 5
                          }
                        },
                        "name": "is_topup_enough_reward"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 3
                          }
                        },
                        "name": "reward_pool"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 3
                          }
                        },
                        "name": "total_unclaimed_reward"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 3
                          }
                        },
                        "name": "max_staking_amount"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 3
                          }
                        },
                        "name": "min_reward_amount"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 3
                          }
                        },
                        "name": "total_staked"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 4
                          }
                        },
                        "name": "duration"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 4
                          }
                        },
                        "name": "start_time"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 3
                          }
                        },
                        "name": "unstake_fee"
                      },
                      {
                        "layout": {
                          "enum": {
                            "dispatchKey": "0x00000000",
                            "name": "Option",
                            "variants": {
                              "0": {
                                "fields": [],
                                "name": "None"
                              },
                              "1": {
                                "fields": [
                                  {
                                    "layout": {
                                      "leaf": {
                                        "key": "0x00000000",
                                        "ty": 6
                                      }
                                    },
                                    "name": "0"
                                  }
                                ],
                                "name": "Some"
                              }
                            }
                          }
                        },
                        "name": "_reserved"
                      }
                    ],
                    "name": "Data"
                  }
                },
                "name": "data"
              }
            ],
            "name": "MyLPPool"
          }
        },
        "root_key": "0x00000000"
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 1,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_primitives",
            "types",
            "AccountId"
          ]
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 2
            }
          }
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "primitive": "u128"
          }
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "primitive": "u64"
          }
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "primitive": "bool"
          }
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "tuple": []
          }
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 8
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 16
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 8
            },
            {
              "name": "E",
              "type": 16
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 8,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 6
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 6
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 9,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 10,
                      "typeName": "String"
                    }
                  ],
                  "index": 0,
                  "name": "Custom"
                },
                {
                  "fields": [
                    {
                      "type": 11,
                      "typeName": "OwnableError"
                    }
                  ],
                  "index": 1,
                  "name": "OwnableError"
                },
                {
                  "fields": [
                    {
                      "type": 12,
                      "typeName": "AccessControlError"
                    }
                  ],
                  "index": 2,
                  "name": "AccessControlError"
                },
                {
                  "fields": [
                    {
                      "type": 13,
                      "typeName": "PSP22Error"
                    }
                  ],
                  "index": 3,
                  "name": "PSP22Error"
                },
                {
                  "fields": [
                    {
                      "type": 14,
                      "typeName": "PSP34Error"
                    }
                  ],
                  "index": 4,
                  "name": "PSP34Error"
                },
                {
                  "fields": [
                    {
                      "type": 15,
                      "typeName": "PausableError"
                    }
                  ],
                  "index": 5,
                  "name": "PausableError"
                },
                {
                  "index": 6,
                  "name": "NotEnoughBalance"
                },
                {
                  "index": 7,
                  "name": "WithdrawFeeError"
                },
                {
                  "index": 8,
                  "name": "NotCallable"
                },
                {
                  "index": 9,
                  "name": "CannotTransfer"
                },
                {
                  "index": 10,
                  "name": "CannotBurn"
                },
                {
                  "index": 11,
                  "name": "CheckedOperations"
                },
                {
                  "index": 12,
                  "name": "InvalidBalanceAndAllowance"
                },
                {
                  "index": 13,
                  "name": "AlreadyInit"
                },
                {
                  "index": 14,
                  "name": "InvalidBuyAmount"
                },
                {
                  "index": 15,
                  "name": "InvalidTransferAmount"
                },
                {
                  "index": 16,
                  "name": "CannotCreatePool"
                },
                {
                  "index": 17,
                  "name": "NotTimeToStake"
                },
                {
                  "index": 18,
                  "name": "NoStakerFound"
                },
                {
                  "index": 19,
                  "name": "InvalidUnstakedAmount"
                },
                {
                  "index": 20,
                  "name": "NotEnoughReward"
                },
                {
                  "index": 21,
                  "name": "NotTokenOwner"
                },
                {
                  "index": 22,
                  "name": "AllowanceNotSet"
                },
                {
                  "index": 23,
                  "name": "TokenNotFound"
                },
                {
                  "index": 24,
                  "name": "UserNotStake"
                },
                {
                  "index": 25,
                  "name": "NoTokenOwner"
                },
                {
                  "index": 26,
                  "name": "ExceedTotalStakingAmount"
                },
                {
                  "index": 27,
                  "name": "NoClaimAmount"
                },
                {
                  "index": 28,
                  "name": "NotTimeToWithdraw"
                },
                {
                  "index": 29,
                  "name": "NotEnoughRewardToWithdraw"
                },
                {
                  "index": 30,
                  "name": "NotTopupEnoughReward"
                },
                {
                  "index": 31,
                  "name": "NoAmount"
                },
                {
                  "index": 32,
                  "name": "InvalidTokenBalanceAndAllowance"
                },
                {
                  "index": 33,
                  "name": "CannotApprove"
                },
                {
                  "index": 34,
                  "name": "CannotTopupRewardPool"
                },
                {
                  "index": 35,
                  "name": "NotTimeToPurchase"
                },
                {
                  "index": 36,
                  "name": "NotTimeToClaim"
                },
                {
                  "index": 37,
                  "name": "NotTimeToBurn"
                },
                {
                  "index": 38,
                  "name": "NoTokenPurchased"
                },
                {
                  "index": 39,
                  "name": "AlreadyBurnt"
                },
                {
                  "index": 40,
                  "name": "InvalidTime"
                },
                {
                  "index": 41,
                  "name": "InvalidPercentage"
                },
                {
                  "index": 42,
                  "name": "InvalidDuration"
                },
                {
                  "index": 43,
                  "name": "InvalidVestingUnit"
                },
                {
                  "index": 44,
                  "name": "InvalidTopupAmount"
                },
                {
                  "index": 45,
                  "name": "LaunchpadNotExist"
                },
                {
                  "index": 46,
                  "name": "InvalidIsActiveInput"
                },
                {
                  "index": 47,
                  "name": "InvalidCreationFee"
                },
                {
                  "index": 48,
                  "name": "InvalidTxRate"
                },
                {
                  "index": 49,
                  "name": "InvalidPhaseData"
                },
                {
                  "index": 50,
                  "name": "CannotTopupToken"
                },
                {
                  "index": 51,
                  "name": "InvalidStartTimeAndEndTime"
                },
                {
                  "index": 52,
                  "name": "InvalidPhaseCount"
                },
                {
                  "index": 53,
                  "name": "InvalidMaxStakingAmount"
                },
                {
                  "index": 54,
                  "name": "InvalidApy"
                },
                {
                  "index": 55,
                  "name": "InvalidMultiplier"
                },
                {
                  "index": 56,
                  "name": "InvalidWhitelistData"
                },
                {
                  "index": 57,
                  "name": "PhaseNotExist"
                },
                {
                  "index": 58,
                  "name": "PhaseNotActive"
                },
                {
                  "index": 59,
                  "name": "WhitelistBuyerInfoNotExist"
                },
                {
                  "index": 60,
                  "name": "WhitelistBuyerInfoExist"
                },
                {
                  "index": 61,
                  "name": "WhitelistBuyerPurchased"
                },
                {
                  "index": 62,
                  "name": "WhitelistSaleInfoNotExist"
                },
                {
                  "index": 63,
                  "name": "WhitelistPhaseAccountNotExist"
                },
                {
                  "index": 64,
                  "name": "PublicSaleInfoNotExist"
                },
                {
                  "index": 65,
                  "name": "InvalidSetActive"
                },
                {
                  "index": 66,
                  "name": "InvalidTotalAmount"
                },
                {
                  "index": 67,
                  "name": "CannotTransferTxFee"
                },
                {
                  "index": 68,
                  "name": "ActiveLaunchpadStatusNotFound"
                },
                {
                  "index": 69,
                  "name": "LaunchpadNotActive"
                },
                {
                  "index": 70,
                  "name": "InvalidCaller"
                },
                {
                  "index": 71,
                  "name": "NoPhaseActive"
                },
                {
                  "index": 72,
                  "name": "InvalidTotalSupply"
                },
                {
                  "index": 73,
                  "name": "PhaseNotPublic"
                },
                {
                  "index": 74,
                  "name": "InvalidSetPublic"
                },
                {
                  "index": 75,
                  "name": "InvalidCapAmount"
                },
                {
                  "index": 76,
                  "name": "InvalidWhitelistAmount"
                },
                {
                  "index": 77,
                  "name": "CapExceeded"
                },
                {
                  "index": 78,
                  "name": "CannotCollectInwV1"
                },
                {
                  "index": 79,
                  "name": "CannotCollectInwV2"
                },
                {
                  "index": 80,
                  "name": "CannotMintInwV2"
                },
                {
                  "index": 81,
                  "name": "CannotTransferInwV1"
                }
              ]
            }
          },
          "path": [
            "inkwhale_project",
            "traits",
            "error",
            "Error"
          ]
        }
      },
      {
        "id": 10,
        "type": {
          "def": {
            "primitive": "str"
          }
        }
      },
      {
        "id": 11,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "CallerIsNotOwner"
                },
                {
                  "index": 1,
                  "name": "NewOwnerIsZero"
                }
              ]
            }
          },
          "path": [
            "openbrush_contracts",
            "traits",
            "errors",
            "ownable",
            "OwnableError"
          ]
        }
      },
      {
        "id": 12,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "InvalidCaller"
                },
                {
                  "index": 1,
                  "name": "MissingRole"
                },
                {
                  "index": 2,
                  "name": "RoleRedundant"
                }
              ]
            }
          },
          "path": [
            "openbrush_contracts",
            "traits",
            "errors",
            "access_control",
            "AccessControlError"
          ]
        }
      },
      {
        "id": 13,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 10,
                      "typeName": "String"
                    }
                  ],
                  "index": 0,
                  "name": "Custom"
                },
                {
                  "index": 1,
                  "name": "InsufficientBalance"
                },
                {
                  "index": 2,
                  "name": "InsufficientAllowance"
                },
                {
                  "index": 3,
                  "name": "ZeroRecipientAddress"
                },
                {
                  "index": 4,
                  "name": "ZeroSenderAddress"
                },
                {
                  "fields": [
                    {
                      "type": 10,
                      "typeName": "String"
                    }
                  ],
                  "index": 5,
                  "name": "SafeTransferCheckFailed"
                }
              ]
            }
          },
          "path": [
            "openbrush_contracts",
            "traits",
            "errors",
            "psp22",
            "PSP22Error"
          ]
        }
      },
      {
        "id": 14,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 10,
                      "typeName": "String"
                    }
                  ],
                  "index": 0,
                  "name": "Custom"
                },
                {
                  "index": 1,
                  "name": "SelfApprove"
                },
                {
                  "index": 2,
                  "name": "NotApproved"
                },
                {
                  "index": 3,
                  "name": "TokenExists"
                },
                {
                  "index": 4,
                  "name": "TokenNotExists"
                },
                {
                  "fields": [
                    {
                      "type": 10,
                      "typeName": "String"
                    }
                  ],
                  "index": 5,
                  "name": "SafeTransferCheckFailed"
                }
              ]
            }
          },
          "path": [
            "openbrush_contracts",
            "traits",
            "errors",
            "psp34",
            "PSP34Error"
          ]
        }
      },
      {
        "id": 15,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "Paused"
                },
                {
                  "index": 1,
                  "name": "NotPaused"
                }
              ]
            }
          },
          "path": [
            "openbrush_contracts",
            "traits",
            "errors",
            "pausable",
            "PausableError"
          ]
        }
      },
      {
        "id": 16,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 1,
                  "name": "CouldNotReadInput"
                }
              ]
            }
          },
          "path": [
            "ink_primitives",
            "LangError"
          ]
        }
      },
      {
        "id": 17,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 0
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 16
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 0
            },
            {
              "name": "E",
              "type": 16
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 18,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 19
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 16
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 19
            },
            {
              "name": "E",
              "type": 16
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 19,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 20
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 20
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 20,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "last_reward_update",
                  "type": 4,
                  "typeName": "u64"
                },
                {
                  "name": "staked_value",
                  "type": 3,
                  "typeName": "Balance"
                },
                {
                  "name": "unclaimed_reward",
                  "type": 3,
                  "typeName": "Balance"
                },
                {
                  "name": "future_reward",
                  "type": 3,
                  "typeName": "Balance"
                }
              ]
            }
          },
          "path": [
            "inkwhale_project",
            "impls",
            "generic_pool_contract",
            "data",
            "StakeInformation"
          ]
        }
      },
      {
        "id": 21,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 3
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 16
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 3
            },
            {
              "name": "E",
              "type": 16
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 22,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 4
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 16
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 4
            },
            {
              "name": "E",
              "type": 16
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 23,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 5
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 16
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 5
            },
            {
              "name": "E",
              "type": 16
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 24,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 25
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 16
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 25
            },
            {
              "name": "E",
              "type": 16
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 25,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 3
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 3
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 26,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 27
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 16
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 27
            },
            {
              "name": "E",
              "type": 16
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 27,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 6
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 11
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 6
            },
            {
              "name": "E",
              "type": 11
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 28,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 29
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 16
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 29
            },
            {
              "name": "E",
              "type": 16
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 29,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 0
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 0
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 30,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 1,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_primitives",
            "types",
            "Hash"
          ]
        }
      },
      {
        "id": 31,
        "type": {
          "def": {
            "primitive": "u32"
          }
        }
      },
      {
        "id": 32,
        "type": {
          "def": {
            "variant": {}
          },
          "path": [
            "ink_env",
            "types",
            "NoChainExtension"
          ]
        }
      }
    ],
    "version": "4"
  }
};

export default lp_pool_contract;
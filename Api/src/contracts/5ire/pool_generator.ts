const pool_generator = {
  CONTRACT_ADDRESS: "5FrY2VNhe1L1dn5wMiLATHxrFRBUa79JtqSEmbLvQ25ddiCT",
  CONTRACT_ABI: {
    "source": {
      "hash": "0x99da7b60ce4bc8988576f83af5752cec649e85f1f7ef545530033de9aeb18e14",
      "language": "ink! 4.0.1",
      "compiler": "rustc 1.70.0-nightly",
      "build_info": {
        "build_mode": "Release",
        "cargo_contract_version": "2.1.0",
        "rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
        "wasm_opt_settings": {
          "keep_debug_symbols": false,
          "optimization_passes": "Z"
        }
      }
    },
    "contract": {
      "name": "pool_generator",
      "version": "1.0.0",
      "authors": [
        "InkWhale <admin@artzero.io>"
      ]
    },
    "spec": {
      "constructors": [
        {
          "args": [
            {
              "label": "pool_hash",
              "type": {
                "displayName": [
                  "Hash"
                ],
                "type": 4
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
              "label": "creation_fee",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            },
            {
              "label": "unstake_fee",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            },
            {
              "label": "owner_address",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            }
          ],
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
      "events": [],
      "lang_error": {
        "displayName": [
          "ink",
          "LangError"
        ],
        "type": 8
      },
      "messages": [
        {
          "args": [
            {
              "label": "pool_hash",
              "type": {
                "displayName": [
                  "Hash"
                ],
                "type": 4
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
              "label": "creation_fee",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            },
            {
              "label": "unstake_fee",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            }
          ],
          "docs": [],
          "label": "initialize",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 9
          },
          "selector": "0xf2f6dba3"
        },
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
                "type": 6
              }
            },
            {
              "label": "apy",
              "type": {
                "displayName": [
                  "u32"
                ],
                "type": 18
              }
            },
            {
              "label": "duration",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 5
              }
            },
            {
              "label": "start_time",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 5
              }
            }
          ],
          "docs": [],
          "label": "new_pool",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 9
          },
          "selector": "0x2393fe3a"
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
          "docs": [
            " Transfers ownership of the contract to a `new_owner`.",
            " Can only be called by the current owner.",
            "",
            " On success a `OwnershipTransferred` event is emitted.",
            "",
            " # Errors",
            "",
            " Panics with `CallerIsNotOwner` error if caller is not owner.",
            "",
            " Panics with `NewOwnerIsZero` error if new owner's address is zero."
          ],
          "label": "Ownable::transfer_ownership",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 19
          },
          "selector": "0x11f43efd"
        },
        {
          "args": [],
          "docs": [
            " Leaves the contract without owner. It will not be possible to call",
            " owner's functions anymore. Can only be called by the current owner.",
            "",
            " NOTE: Renouncing ownership will leave the contract without an owner,",
            " thereby removing any functionality that is only available to the owner.",
            "",
            " On success a `OwnershipTransferred` event is emitted.",
            "",
            " # Errors",
            "",
            " Panics with `CallerIsNotOwner` error if caller is not owner"
          ],
          "label": "Ownable::renounce_ownership",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 19
          },
          "selector": "0x5e228753"
        },
        {
          "args": [],
          "docs": [
            " Returns the address of the current owner."
          ],
          "label": "Ownable::owner",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 21
          },
          "selector": "0x4fa43c8c"
        },
        {
          "args": [
            {
              "label": "pool_hash",
              "type": {
                "displayName": [
                  "genericpoolgeneratortrait_external",
                  "SetPoolHashInput1"
                ],
                "type": 4
              }
            }
          ],
          "docs": [],
          "label": "GenericPoolGeneratorTrait::set_pool_hash",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 9
          },
          "selector": "0xc49c451f"
        },
        {
          "args": [],
          "docs": [],
          "label": "GenericPoolGeneratorTrait::get_inw_contract",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 21
          },
          "selector": "0xd6b47e7a"
        },
        {
          "args": [],
          "docs": [],
          "label": "GenericPoolGeneratorTrait::get_pool_count",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 22
          },
          "selector": "0x38b09ecb"
        },
        {
          "args": [
            {
              "label": "unstake_fee",
              "type": {
                "displayName": [
                  "genericpoolgeneratortrait_external",
                  "SetUnstakeFeeInput1"
                ],
                "type": 6
              }
            }
          ],
          "docs": [],
          "label": "GenericPoolGeneratorTrait::set_unstake_fee",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 9
          },
          "selector": "0xfd8d8fda"
        },
        {
          "args": [],
          "docs": [],
          "label": "GenericPoolGeneratorTrait::get_creation_fee",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 23
          },
          "selector": "0xea416566"
        },
        {
          "args": [],
          "docs": [],
          "label": "GenericPoolGeneratorTrait::get_unstake_fee",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 23
          },
          "selector": "0xa4395f88"
        },
        {
          "args": [
            {
              "label": "contract_owner",
              "type": {
                "displayName": [
                  "genericpoolgeneratortrait_external",
                  "GetPoolCountByOwnerInput1"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "label": "GenericPoolGeneratorTrait::get_pool_count_by_owner",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 22
          },
          "selector": "0xa4cef8cd"
        },
        {
          "args": [],
          "docs": [],
          "label": "GenericPoolGeneratorTrait::get_pool_hash",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 24
          },
          "selector": "0x79f903bb"
        },
        {
          "args": [
            {
              "label": "inw_contract",
              "type": {
                "displayName": [
                  "genericpoolgeneratortrait_external",
                  "SetInwContractInput1"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "label": "GenericPoolGeneratorTrait::set_inw_contract",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 9
          },
          "selector": "0xf71a1217"
        },
        {
          "args": [
            {
              "label": "creation_fee",
              "type": {
                "displayName": [
                  "genericpoolgeneratortrait_external",
                  "SetCreationFeeInput1"
                ],
                "type": 6
              }
            }
          ],
          "docs": [],
          "label": "GenericPoolGeneratorTrait::set_creation_fee",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 9
          },
          "selector": "0x3cd3873c"
        },
        {
          "args": [
            {
              "label": "contract_owner",
              "type": {
                "displayName": [
                  "genericpoolgeneratortrait_external",
                  "GetPoolByOwnerInput1"
                ],
                "type": 0
              }
            },
            {
              "label": "index",
              "type": {
                "displayName": [
                  "genericpoolgeneratortrait_external",
                  "GetPoolByOwnerInput2"
                ],
                "type": 5
              }
            }
          ],
          "docs": [],
          "label": "GenericPoolGeneratorTrait::get_pool_by_owner",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 25
          },
          "selector": "0x476bc739"
        },
        {
          "args": [
            {
              "label": "index",
              "type": {
                "displayName": [
                  "genericpoolgeneratortrait_external",
                  "GetPoolInput1"
                ],
                "type": 5
              }
            }
          ],
          "docs": [],
          "label": "GenericPoolGeneratorTrait::get_pool",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "ink",
              "MessageResult"
            ],
            "type": 27
          },
          "selector": "0xd8207f36"
        },
        {
          "args": [],
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
            "type": 29
          },
          "selector": "0xc4360570"
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
                "type": 6
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
            "type": 9
          },
          "selector": "0x07573e99"
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
                "type": 6
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
            "type": 9
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
            "type": 9
          },
          "selector": "0x9e32fab2"
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
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 0
                          }
                        },
                        "name": "owner"
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
                                        "ty": 3
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
                            "ty": 4
                          }
                        },
                        "name": "pool_hash"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 5
                          }
                        },
                        "name": "pool_count"
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
                            "ty": 6
                          }
                        },
                        "name": "creation_fee"
                      },
                      {
                        "layout": {
                          "leaf": {
                            "key": "0x00000000",
                            "ty": 6
                          }
                        },
                        "name": "unstake_fee"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0x500f3843",
                                "ty": 0
                              }
                            },
                            "root_key": "0x500f3843"
                          }
                        },
                        "name": "pool_list"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0x48bd4f7d",
                                "ty": 5
                              }
                            },
                            "root_key": "0x48bd4f7d"
                          }
                        },
                        "name": "pool_ids"
                      },
                      {
                        "layout": {
                          "root": {
                            "layout": {
                              "leaf": {
                                "key": "0xd84cec05",
                                "ty": 5
                              }
                            },
                            "root_key": "0xd84cec05"
                          }
                        },
                        "name": "pool_ids_last_index"
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
                                        "ty": 3
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
                "name": "manager"
              },
              {
                "layout": {
                  "struct": {
                    "fields": [
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
                                        "ty": 3
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
                "name": "admin_data"
              },
              {
                "layout": {
                  "struct": {
                    "fields": [
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
                                        "ty": 3
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
                "name": "upgradeable_data"
              }
            ],
            "name": "PoolGenerator"
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
            "tuple": []
          }
        }
      },
      {
        "id": 4,
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
        "id": 5,
        "type": {
          "def": {
            "primitive": "u64"
          }
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "primitive": "u128"
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
                      "type": 3
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 8
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
              "type": 8
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
        "id": 9,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 10
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 8
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
              "type": 10
            },
            {
              "name": "E",
              "type": 8
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 10,
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
              "type": 3
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
        "id": 11,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 12,
                      "typeName": "String"
                    }
                  ],
                  "index": 0,
                  "name": "Custom"
                },
                {
                  "fields": [
                    {
                      "type": 13,
                      "typeName": "OwnableError"
                    }
                  ],
                  "index": 1,
                  "name": "OwnableError"
                },
                {
                  "fields": [
                    {
                      "type": 14,
                      "typeName": "AccessControlError"
                    }
                  ],
                  "index": 2,
                  "name": "AccessControlError"
                },
                {
                  "fields": [
                    {
                      "type": 15,
                      "typeName": "PSP22Error"
                    }
                  ],
                  "index": 3,
                  "name": "PSP22Error"
                },
                {
                  "fields": [
                    {
                      "type": 17,
                      "typeName": "PSP34Error"
                    }
                  ],
                  "index": 4,
                  "name": "PSP34Error"
                },
                {
                  "index": 5,
                  "name": "NotEnoughBalance"
                },
                {
                  "index": 6,
                  "name": "WithdrawFeeError"
                },
                {
                  "index": 7,
                  "name": "NotCallable"
                },
                {
                  "index": 8,
                  "name": "CannotTransfer"
                },
                {
                  "index": 9,
                  "name": "CannotBurn"
                },
                {
                  "index": 10,
                  "name": "CheckedOperations"
                },
                {
                  "index": 11,
                  "name": "InvalidBalanceAndAllowance"
                },
                {
                  "index": 12,
                  "name": "AlreadyInit"
                },
                {
                  "index": 13,
                  "name": "InvalidBuyAmount"
                },
                {
                  "index": 14,
                  "name": "InvalidTransferAmount"
                },
                {
                  "index": 15,
                  "name": "CannotCreatePool"
                },
                {
                  "index": 16,
                  "name": "NotTimeToStake"
                },
                {
                  "index": 17,
                  "name": "NoStakerFound"
                },
                {
                  "index": 18,
                  "name": "InvalidUnstakedAmount"
                },
                {
                  "index": 19,
                  "name": "NotEnoughReward"
                },
                {
                  "index": 20,
                  "name": "NotTokenOwner"
                },
                {
                  "index": 21,
                  "name": "AllowanceNotSet"
                },
                {
                  "index": 22,
                  "name": "TokenNotFound"
                },
                {
                  "index": 23,
                  "name": "UserNotStake"
                },
                {
                  "index": 24,
                  "name": "NoTokenOwner"
                },
                {
                  "index": 25,
                  "name": "ExceedTotalStakingAmount"
                },
                {
                  "index": 26,
                  "name": "NoClaimAmount"
                },
                {
                  "index": 27,
                  "name": "NotTimeToWithdraw"
                },
                {
                  "index": 28,
                  "name": "NotEnoughRewardToWithdraw"
                },
                {
                  "index": 29,
                  "name": "NotTopupEnoughReward"
                },
                {
                  "index": 30,
                  "name": "NoAmount"
                },
                {
                  "index": 31,
                  "name": "InvalidTokenBalanceAndAllowance"
                },
                {
                  "index": 32,
                  "name": "CannotApprove"
                },
                {
                  "index": 33,
                  "name": "CannotTopupRewardPool"
                },
                {
                  "index": 34,
                  "name": "NotTimeToPurchase"
                },
                {
                  "index": 35,
                  "name": "NotTimeToClaim"
                },
                {
                  "index": 36,
                  "name": "NotTimeToBurn"
                },
                {
                  "index": 37,
                  "name": "NoTokenPurchased"
                },
                {
                  "index": 38,
                  "name": "AlreadyBurnt"
                },
                {
                  "index": 39,
                  "name": "InvalidTime"
                },
                {
                  "index": 40,
                  "name": "InvalidPercentage"
                },
                {
                  "index": 41,
                  "name": "InvalidDuration"
                },
                {
                  "index": 42,
                  "name": "InvalidTopupAmount"
                },
                {
                  "index": 43,
                  "name": "LaunchpadNotExist"
                },
                {
                  "index": 44,
                  "name": "InvalidIsActiveInput"
                },
                {
                  "index": 45,
                  "name": "InvalidCreationFee"
                },
                {
                  "index": 46,
                  "name": "InvalidTxRate"
                },
                {
                  "index": 47,
                  "name": "InvalidPhaseData"
                },
                {
                  "index": 48,
                  "name": "CannotTopupToken"
                },
                {
                  "index": 49,
                  "name": "InvalidStartTimeAndEndTime"
                },
                {
                  "index": 50,
                  "name": "InvalidPhaseCount"
                },
                {
                  "index": 51,
                  "name": "InvalidMaxStakingAmount"
                },
                {
                  "index": 52,
                  "name": "InvalidApy"
                },
                {
                  "index": 53,
                  "name": "InvalidMultiplier"
                },
                {
                  "index": 54,
                  "name": "InvalidWhitelistData"
                },
                {
                  "index": 55,
                  "name": "PhaseNotExist"
                },
                {
                  "index": 56,
                  "name": "PhaseNotActive"
                },
                {
                  "index": 57,
                  "name": "WhitelistBuyerInfoNotExist"
                },
                {
                  "index": 58,
                  "name": "WhitelistBuyerInfoExist"
                },
                {
                  "index": 59,
                  "name": "WhitelistBuyerPurchased"
                },
                {
                  "index": 60,
                  "name": "WhitelistSaleInfoNotExist"
                },
                {
                  "index": 61,
                  "name": "WhitelistPhaseAccountNotExist"
                },
                {
                  "index": 62,
                  "name": "PublicSaleInfoNotExist"
                },
                {
                  "index": 63,
                  "name": "InvalidSetActive"
                },
                {
                  "index": 64,
                  "name": "InvalidTotalAmount"
                },
                {
                  "index": 65,
                  "name": "CannotTransferTxFee"
                },
                {
                  "index": 66,
                  "name": "ActiveLaunchpadStatusNotFound"
                },
                {
                  "index": 67,
                  "name": "LaunchpadNotActive"
                },
                {
                  "index": 68,
                  "name": "InvalidCaller"
                },
                {
                  "index": 69,
                  "name": "NoPhaseActive"
                },
                {
                  "index": 70,
                  "name": "InvalidTotalSupply"
                },
                {
                  "index": 71,
                  "name": "PhaseNotPublic"
                },
                {
                  "index": 72,
                  "name": "InvalidSetPublic"
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
        "id": 12,
        "type": {
          "def": {
            "primitive": "str"
          }
        }
      },
      {
        "id": 13,
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
        "id": 14,
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
        "id": 15,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 16,
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
                      "type": 16,
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
        "id": 16,
        "type": {
          "def": {
            "sequence": {
              "type": 2
            }
          }
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
                      "type": 16,
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
                      "type": 16,
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
        "id": 18,
        "type": {
          "def": {
            "primitive": "u32"
          }
        }
      },
      {
        "id": 19,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 20
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 8
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
              "type": 20
            },
            {
              "name": "E",
              "type": 8
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 20,
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
                      "type": 13
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
              "type": 13
            }
          ],
          "path": [
            "Result"
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
                      "type": 0
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 8
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
              "type": 8
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
                      "type": 5
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 8
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
              "type": 8
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
                      "type": 6
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 8
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
              "type": 8
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
                      "type": 4
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 8
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
              "type": 8
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
                      "type": 26
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 8
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
              "type": 26
            },
            {
              "name": "E",
              "type": 8
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
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 5
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
              "type": 5
            }
          ],
          "path": [
            "Option"
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
                      "type": 28
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 8
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
              "type": 28
            },
            {
              "name": "E",
              "type": 8
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
        "id": 29,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 30
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 8
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
              "type": 30
            },
            {
              "name": "E",
              "type": 8
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 30,
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
      }
    ],
    "version": "4"
  },
};

export default pool_generator;
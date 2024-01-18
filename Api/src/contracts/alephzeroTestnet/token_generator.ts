const core_contract = {
  CONTRACT_ADDRESS: "5CziXvnbXHwa1zpm7BemypEdqKEsgFp6vZiEokTxJ7hMr6Py",
  CONTRACT_ABI: {
	  "source": {
		"hash": "0x86ffd7ead0dd90ccdb204ffdaf984f633ce8b0cf3c827e5e26e27851ce2d0928",
		"language": "ink! 4.1.0",
		"compiler": "rustc 1.70.0-nightly",
		"build_info": {
		  "build_mode": "Release",
		  "cargo_contract_version": "2.0.2",
		  "rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
		  "wasm_opt_settings": {
			"keep_debug_symbols": false,
			"optimization_passes": "Z"
		  }
		}
	  },
	  "contract": {
		"name": "token_generator",
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
				"label": "psp22_hash",
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
				"label": "psp22_hash",
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
				"label": "mint_to",
				"type": {
				  "displayName": [
					"AccountId"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "cap",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "name",
				"type": {
				  "displayName": [
					"String"
				  ],
				  "type": 15
				}
			  },
			  {
				"label": "symbol",
				"type": {
				  "displayName": [
					"String"
				  ],
				  "type": 15
				}
			  },
			  {
				"label": "decimal",
				"type": {
				  "displayName": [
					"u8"
				  ],
				  "type": 2
				}
			  }
			],
			"docs": [],
			"label": "new_token",
			"mutates": true,
			"payable": true,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0x7d97ec7b"
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
			  "type": 16
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
			  "type": 18
			},
			"selector": "0x4fa43c8c"
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
			  "type": 16
			},
			"selector": "0x11f43efd"
		  },
		  {
			"args": [
			  {
				"label": "creation_fee",
				"type": {
				  "displayName": [
					"tokenmanagertrait_external",
					"SetCreationFeeInput1"
				  ],
				  "type": 6
				}
			  }
			],
			"docs": [],
			"label": "TokenManagerTrait::set_creation_fee",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0xa82ecdff"
		  },
		  {
			"args": [
			  {
				"label": "value",
				"type": {
				  "displayName": [
					"tokenmanagertrait_external",
					"WithdrawInwInput1"
				  ],
				  "type": 6
				}
			  }
			],
			"docs": [],
			"label": "TokenManagerTrait::withdraw_inw",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0xceb024c7"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "TokenManagerTrait::get_contract_hash",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 19
			},
			"selector": "0xf39b5876"
		  },
		  {
			"args": [
			  {
				"label": "inw_contract",
				"type": {
				  "displayName": [
					"tokenmanagertrait_external",
					"SetInwContractInput1"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [],
			"label": "TokenManagerTrait::set_inw_contract",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0x55f43bf5"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "TokenManagerTrait::get_inw_contract",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 18
			},
			"selector": "0x7d2a84a9"
		  },
		  {
			"args": [
			  {
				"label": "index",
				"type": {
				  "displayName": [
					"tokenmanagertrait_external",
					"GetTokenContractAddressInput1"
				  ],
				  "type": 5
				}
			  }
			],
			"docs": [],
			"label": "TokenManagerTrait::get_token_contract_address",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 20
			},
			"selector": "0xf1cfb0f6"
		  },
		  {
			"args": [
			  {
				"label": "psp22_hash",
				"type": {
				  "displayName": [
					"tokenmanagertrait_external",
					"SetContractHashInput1"
				  ],
				  "type": 4
				}
			  }
			],
			"docs": [],
			"label": "TokenManagerTrait::set_contract_hash",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0xf38784b8"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "TokenManagerTrait::get_token_count",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 22
			},
			"selector": "0xebabc233"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "TokenManagerTrait::get_creation_fee",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 23
			},
			"selector": "0x034ef9b9"
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
			  "type": 24
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
						  "name": "standard_psp22_hash"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 5
							}
						  },
						  "name": "token_count"
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
							"root": {
							  "layout": {
								"leaf": {
								  "key": "0x2dbd96e9",
								  "ty": 0
								}
							  },
							  "root_key": "0x2dbd96e9"
							}
						  },
						  "name": "token_list"
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
			  "name": "TokenGenerator"
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
						"typeName": "PSP22Error"
					  }
					],
					"index": 2,
					"name": "PSP22Error"
				  },
				  {
					"index": 3,
					"name": "NotEnoughBalance"
				  },
				  {
					"index": 4,
					"name": "WithdrawFeeError"
				  },
				  {
					"index": 5,
					"name": "NotCallable"
				  },
				  {
					"index": 6,
					"name": "CannotTransfer"
				  },
				  {
					"index": 7,
					"name": "CannotBurn"
				  },
				  {
					"index": 8,
					"name": "CheckedOperations"
				  },
				  {
					"index": 9,
					"name": "InvalidBalanceAndAllowance"
				  },
				  {
					"index": 10,
					"name": "AlreadyInit"
				  },
				  {
					"index": 11,
					"name": "InvalidBuyAmount"
				  },
				  {
					"index": 12,
					"name": "InvalidTransferAmount"
				  },
				  {
					"index": 13,
					"name": "CannotCreatePool"
				  },
				  {
					"index": 14,
					"name": "NotTimeToStake"
				  },
				  {
					"index": 15,
					"name": "NoStakerFound"
				  },
				  {
					"index": 16,
					"name": "InvalidUnstakedAmount"
				  },
				  {
					"index": 17,
					"name": "NotEnoughReward"
				  },
				  {
					"index": 18,
					"name": "NotTokenOwner"
				  },
				  {
					"index": 19,
					"name": "AllowanceNotSet"
				  },
				  {
					"index": 20,
					"name": "TokenNotFound"
				  },
				  {
					"index": 21,
					"name": "UserNotStake"
				  },
				  {
					"index": 22,
					"name": "NoTokenOwner"
				  },
				  {
					"index": 23,
					"name": "ExceedTotalStakingAmount"
				  },
				  {
					"index": 24,
					"name": "NoClaimAmount"
				  },
				  {
					"index": 25,
					"name": "NotTimeToWithdraw"
				  },
				  {
					"index": 26,
					"name": "NotEnoughRewardToWithdraw"
				  },
				  {
					"index": 27,
					"name": "NotTopupEnoughReward"
				  },
				  {
					"index": 28,
					"name": "NoAmount"
				  },
				  {
					"index": 29,
					"name": "InvalidTokenBalanceAndAllowance"
				  },
				  {
					"index": 30,
					"name": "CannotApprove"
				  },
				  {
					"index": 31,
					"name": "CannotTopupRewardPool"
				  },
				  {
					"index": 32,
					"name": "NotTimeToPurchase"
				  },
				  {
					"index": 33,
					"name": "NotTimeToClaim"
				  },
				  {
					"index": 34,
					"name": "NotTimeToBurn"
				  },
				  {
					"index": 35,
					"name": "NoTokenPurchased"
				  },
				  {
					"index": 36,
					"name": "AlreadyBurnt"
				  },
				  {
					"index": 37,
					"name": "InvalidTime"
				  },
				  {
					"index": 38,
					"name": "InvalidPercentage"
				  },
				  {
					"index": 39,
					"name": "InvalidDuration"
				  },
				  {
					"index": 40,
					"name": "InvalidTopupAmount"
				  },
				  {
					"index": 41,
					"name": "LaunchpadNotExist"
				  },
				  {
					"index": 42,
					"name": "InvalidIsActiveInput"
				  },
				  {
					"index": 43,
					"name": "InvalidCreationFee"
				  },
				  {
					"index": 44,
					"name": "InvalidPhaseData"
				  },
				  {
					"index": 45,
					"name": "CannotTopupToken"
				  },
				  {
					"index": 46,
					"name": "InvalidStartTimeAndEndTime"
				  },
				  {
					"index": 47,
					"name": "InvalidPhaseCount"
				  },
				  {
					"index": 48,
					"name": "InvalidMaxStakingAmount"
				  },
				  {
					"index": 49,
					"name": "InvalidApy"
				  },
				  {
					"index": 50,
					"name": "InvalidMultiplier"
				  },
				  {
					"index": 51,
					"name": "InvalidWhitelistData"
				  },
				  {
					"index": 52,
					"name": "PhaseNotExist"
				  },
				  {
					"index": 53,
					"name": "WhitelistNotExist"
				  },
				  {
					"index": 54,
					"name": "WhitelistSaleInfoNotExist"
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
					"fields": [
					  {
						"type": 15,
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
						"type": 15,
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
		  "id": 15,
		  "type": {
			"def": {
			  "sequence": {
				"type": 2
			  }
			}
		  }
		},
		{
		  "id": 16,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 17
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
				"type": 17
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
		  "id": 17,
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
		  "id": 18,
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
		  "id": 19,
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
		  "id": 20,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 21
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
				"type": 21
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
		  "id": 21,
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
						"type": 25
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
				"type": 25
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
	}
};

export default core_contract;
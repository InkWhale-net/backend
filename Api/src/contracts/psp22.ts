export const psp22_contract = {
  CONTRACT_ADDRESS: "5H4aCwLKUpVpct6XGJzDGPPXFockNKQU2JUVNgUw6BXEPzST",
  CONTRACT_ABI: {
	  "source": {
		"hash": "0x64b49954be22afc476d581ee34697faf475ce39df00960e20c4269907891e4d8",
		"language": "ink! 4.1.0",
		"compiler": "rustc 1.70.0-nightly",
		"build_info": {
		  "build_mode": "Debug",
		  "cargo_contract_version": "2.0.0-rc",
		  "rust_toolchain": "nightly-x86_64-unknown-linux-gnu",
		  "wasm_opt_settings": {
			"keep_debug_symbols": false,
			"optimization_passes": "Z"
		  }
		}
	  },
	  "contract": {
		"name": "psp22_standard",
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
				"label": "cap",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "name",
				"type": {
				  "displayName": [
					"String"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "symbol",
				"type": {
				  "displayName": [
					"String"
				  ],
				  "type": 6
				}
			  },
			  {
				"label": "decimal",
				"type": {
				  "displayName": [
					"u8"
				  ],
				  "type": 3
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
				"label": "spender",
				"type": {
				  "displayName": [
					"psp22_external",
					"IncreaseAllowanceInput1"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "delta_value",
				"type": {
				  "displayName": [
					"psp22_external",
					"IncreaseAllowanceInput2"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " Atomically increases the allowance granted to `spender` by the caller.",
			  "",
			  " An `Approval` event is emitted.",
			  "",
			  " # Errors",
			  "",
			  " Returns `ZeroSenderAddress` error if sender's address is zero.",
			  "",
			  " Returns `ZeroRecipientAddress` error if recipient's address is zero."
			],
			"label": "PSP22::increase_allowance",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0x96d6b57a"
		  },
		  {
			"args": [
			  {
				"label": "from",
				"type": {
				  "displayName": [
					"psp22_external",
					"TransferFromInput1"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "to",
				"type": {
				  "displayName": [
					"psp22_external",
					"TransferFromInput2"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "value",
				"type": {
				  "displayName": [
					"psp22_external",
					"TransferFromInput3"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "data",
				"type": {
				  "displayName": [
					"psp22_external",
					"TransferFromInput4"
				  ],
				  "type": 2
				}
			  }
			],
			"docs": [
			  " Transfers `value` tokens on the behalf of `from` to the account `to`",
			  " with additional `data` in unspecified format.",
			  "",
			  " This can be used to allow a contract to transfer tokens on ones behalf and/or",
			  " to charge fees in sub-currencies, for example.",
			  "",
			  " On success a `Transfer` and `Approval` events are emitted.",
			  "",
			  " # Errors",
			  "",
			  " Returns `InsufficientAllowance` error if there are not enough tokens allowed",
			  " for the caller to withdraw from `from`.",
			  "",
			  " Returns `InsufficientBalance` error if there are not enough tokens on",
			  " the the account Balance of `from`.",
			  "",
			  " Returns `ZeroSenderAddress` error if sender's address is zero.",
			  "",
			  " Returns `ZeroRecipientAddress` error if recipient's address is zero."
			],
			"label": "PSP22::transfer_from",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0x54b3c76e"
		  },
		  {
			"args": [
			  {
				"label": "owner",
				"type": {
				  "displayName": [
					"psp22_external",
					"BalanceOfInput1"
				  ],
				  "type": 4
				}
			  }
			],
			"docs": [
			  " Returns the account Balance for the specified `owner`.",
			  "",
			  " Returns `0` if the account is non-existent."
			],
			"label": "PSP22::balance_of",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 12
			},
			"selector": "0x6568382f"
		  },
		  {
			"args": [
			  {
				"label": "spender",
				"type": {
				  "displayName": [
					"psp22_external",
					"DecreaseAllowanceInput1"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "delta_value",
				"type": {
				  "displayName": [
					"psp22_external",
					"DecreaseAllowanceInput2"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " Atomically decreases the allowance granted to `spender` by the caller.",
			  "",
			  " An `Approval` event is emitted.",
			  "",
			  " # Errors",
			  "",
			  " Returns `InsufficientAllowance` error if there are not enough tokens allowed",
			  " by owner for `spender`.",
			  "",
			  " Returns `ZeroSenderAddress` error if sender's address is zero.",
			  "",
			  " Returns `ZeroRecipientAddress` error if recipient's address is zero."
			],
			"label": "PSP22::decrease_allowance",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0xfecb57d5"
		  },
		  {
			"args": [
			  {
				"label": "to",
				"type": {
				  "displayName": [
					"psp22_external",
					"TransferInput1"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "value",
				"type": {
				  "displayName": [
					"psp22_external",
					"TransferInput2"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "data",
				"type": {
				  "displayName": [
					"psp22_external",
					"TransferInput3"
				  ],
				  "type": 2
				}
			  }
			],
			"docs": [
			  " Transfers `value` amount of tokens from the caller's account to account `to`",
			  " with additional `data` in unspecified format.",
			  "",
			  " On success a `Transfer` event is emitted.",
			  "",
			  " # Errors",
			  "",
			  " Returns `InsufficientBalance` error if there are not enough tokens on",
			  " the caller's account Balance.",
			  "",
			  " Returns `ZeroSenderAddress` error if sender's address is zero.",
			  "",
			  " Returns `ZeroRecipientAddress` error if recipient's address is zero."
			],
			"label": "PSP22::transfer",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0xdb20f9f5"
		  },
		  {
			"args": [
			  {
				"label": "owner",
				"type": {
				  "displayName": [
					"psp22_external",
					"AllowanceInput1"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "spender",
				"type": {
				  "displayName": [
					"psp22_external",
					"AllowanceInput2"
				  ],
				  "type": 4
				}
			  }
			],
			"docs": [
			  " Returns the amount which `spender` is still allowed to withdraw from `owner`.",
			  "",
			  " Returns `0` if no allowance has been set `0`."
			],
			"label": "PSP22::allowance",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 12
			},
			"selector": "0x4d47d921"
		  },
		  {
			"args": [],
			"docs": [
			  " Returns the total token supply."
			],
			"label": "PSP22::total_supply",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 12
			},
			"selector": "0x162df8c2"
		  },
		  {
			"args": [
			  {
				"label": "spender",
				"type": {
				  "displayName": [
					"psp22_external",
					"ApproveInput1"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "value",
				"type": {
				  "displayName": [
					"psp22_external",
					"ApproveInput2"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [
			  " Allows `spender` to withdraw from the caller's account multiple times, up to",
			  " the `value` amount.",
			  "",
			  " If this function is called again it overwrites the current allowance with `value`.",
			  "",
			  " An `Approval` event is emitted.",
			  "",
			  " # Errors",
			  "",
			  " Returns `ZeroSenderAddress` error if sender's address is zero.",
			  "",
			  " Returns `ZeroRecipientAddress` error if recipient's address is zero."
			],
			"label": "PSP22::approve",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0xb20f1bbd"
		  },
		  {
			"args": [],
			"docs": [
			  " Returns the token decimals."
			],
			"label": "PSP22Metadata::token_decimals",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 13
			},
			"selector": "0x7271b782"
		  },
		  {
			"args": [],
			"docs": [
			  " Returns the token name."
			],
			"label": "PSP22Metadata::token_name",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 14
			},
			"selector": "0x3d261bd4"
		  },
		  {
			"args": [],
			"docs": [
			  " Returns the token symbol."
			],
			"label": "PSP22Metadata::token_symbol",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 14
			},
			"selector": "0x34205be5"
		  },
		  {
			"args": [],
			"docs": [
			  " Returns the token's cap"
			],
			"label": "PSP22Capped::cap",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 12
			},
			"selector": "0xf40366b4"
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
			"args": [
			  {
				"label": "new_owner",
				"type": {
				  "displayName": [
					"ownable_external",
					"TransferOwnershipInput1"
				  ],
				  "type": 4
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
			  "type": 19
			},
			"selector": "0x4fa43c8c"
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
				  "type": 0
				}
			  },
			  {
				"label": "receiver",
				"type": {
				  "displayName": [
					"admintrait_external",
					"WithdrawFeeInput2"
				  ],
				  "type": 4
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
			  "type": 20
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
				  "type": 4
				}
			  },
			  {
				"label": "amount",
				"type": {
				  "displayName": [
					"admintrait_external",
					"TranferPsp22Input2"
				  ],
				  "type": 0
				}
			  },
			  {
				"label": "receiver",
				"type": {
				  "displayName": [
					"admintrait_external",
					"TranferPsp22Input3"
				  ],
				  "type": 4
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
			  "type": 20
			},
			"selector": "0xd9aad284"
		  },
		  {
			"args": [
			  {
				"label": "account",
				"type": {
				  "displayName": [
					"psp22burnable_external",
					"BurnInput1"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "amount",
				"type": {
				  "displayName": [
					"psp22burnable_external",
					"BurnInput2"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [],
			"label": "PSP22Burnable::burn",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0x7a9da510"
		  },
		  {
			"args": [
			  {
				"label": "account",
				"type": {
				  "displayName": [
					"psp22mintable_external",
					"MintInput1"
				  ],
				  "type": 4
				}
			  },
			  {
				"label": "amount",
				"type": {
				  "displayName": [
					"psp22mintable_external",
					"MintInput2"
				  ],
				  "type": 0
				}
			  }
			],
			"docs": [],
			"label": "PSP22Mintable::mint",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 9
			},
			"selector": "0xfc3c75d4"
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
						  "name": "supply"
						},
						{
						  "layout": {
							"root": {
							  "layout": {
								"leaf": {
								  "key": "0x1d458d3b",
								  "ty": 0
								}
							  },
							  "root_key": "0x1d458d3b"
							}
						  },
						  "name": "balances"
						},
						{
						  "layout": {
							"root": {
							  "layout": {
								"leaf": {
								  "key": "0x0abd72fb",
								  "ty": 0
								}
							  },
							  "root_key": "0x0abd72fb"
							}
						  },
						  "name": "allowances"
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
										  "ty": 1
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
				  "name": "psp22"
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
										  "ty": 2
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
						  "name": "name"
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
										  "ty": 2
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
						  "name": "symbol"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 3
							}
						  },
						  "name": "decimals"
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
										  "ty": 1
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
				  "name": "metadata"
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
										  "ty": 1
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
							  "ty": 0
							}
						  },
						  "name": "cap"
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
										  "ty": 1
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
				  "name": "cap"
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
										  "ty": 1
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
				}
			  ],
			  "name": "Psp22Nft"
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
			  "primitive": "u128"
			}
		  }
		},
		{
		  "id": 1,
		  "type": {
			"def": {
			  "tuple": []
			}
		  }
		},
		{
		  "id": 2,
		  "type": {
			"def": {
			  "sequence": {
				"type": 3
			  }
			}
		  }
		},
		{
		  "id": 3,
		  "type": {
			"def": {
			  "primitive": "u8"
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
					"type": 5,
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
		  "id": 5,
		  "type": {
			"def": {
			  "array": {
				"len": 32,
				"type": 3
			  }
			}
		  }
		},
		{
		  "id": 6,
		  "type": {
			"def": {
			  "primitive": "str"
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
						"type": 1
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
				"type": 1
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
						"type": 1
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
				"type": 1
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
						"type": 2,
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
						"type": 2,
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
		  "id": 12,
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
		  "id": 13,
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
		  "id": 14,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 15
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
		  "id": 15,
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
						"type": 2
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
				"type": 2
			  }
			],
			"path": [
			  "Option"
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
						"type": 1
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 18
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
				"type": 1
			  },
			  {
				"name": "E",
				"type": 18
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
					"fields": [
					  {
						"type": 1
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 22
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
				"type": 1
			  },
			  {
				"name": "E",
				"type": 22
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
						"type": 6,
						"typeName": "String"
					  }
					],
					"index": 0,
					"name": "Custom"
				  },
				  {
					"index": 1,
					"name": "OnlyOwner"
				  },
				  {
					"index": 2,
					"name": "OnlyAdmin"
				  },
				  {
					"index": 3,
					"name": "InvalidCaller"
				  },
				  {
					"index": 4,
					"name": "InvalidFee"
				  },
				  {
					"index": 5,
					"name": "TokenOwnerNotMatch"
				  },
				  {
					"index": 6,
					"name": "NotApproved"
				  },
				  {
					"index": 7,
					"name": "CannotTransfer"
				  },
				  {
					"index": 8,
					"name": "CannotMint"
				  },
				  {
					"index": 9,
					"name": "NotPublicMint"
				  },
				  {
					"index": 10,
					"name": "NotEnoughBalance"
				  },
				  {
					"index": 11,
					"name": "MaxSupply"
				  },
				  {
					"index": 12,
					"name": "AlreadyInit"
				  },
				  {
					"index": 13,
					"name": "NotOwner"
				  },
				  {
					"index": 14,
					"name": "NotTokenOwner"
				  },
				  {
					"index": 15,
					"name": "ProjectNotExist"
				  },
				  {
					"index": 16,
					"name": "ProjectOwnerAndAdmin"
				  },
				  {
					"index": 17,
					"name": "InvalidStartTimeAndEndTime"
				  },
				  {
					"index": 18,
					"name": "InvalidPhaseCount"
				  },
				  {
					"index": 19,
					"name": "CollectionOwnerAndAdmin"
				  },
				  {
					"index": 20,
					"name": "CollectionNotActive"
				  },
				  {
					"index": 21,
					"name": "CollectionNotExist"
				  },
				  {
					"index": 22,
					"name": "InvalidInput"
				  },
				  {
					"index": 23,
					"name": "InvalidType"
				  },
				  {
					"index": 24,
					"name": "ClaimedAll"
				  },
				  {
					"index": 25,
					"name": "TokenLimitReached"
				  },
				  {
					"index": 26,
					"name": "UpdatePhase"
				  },
				  {
					"index": 27,
					"name": "PhaseNotExist"
				  },
				  {
					"index": 28,
					"name": "PhaseExpired"
				  },
				  {
					"index": 29,
					"name": "PhaseDeactivate"
				  },
				  {
					"index": 30,
					"name": "WhitelistNotExist"
				  },
				  {
					"index": 31,
					"name": "WithdrawFeeError"
				  },
				  {
					"index": 32,
					"name": "WithdrawNFTError"
				  },
				  {
					"index": 33,
					"name": "WithdrawPSP22Error"
				  },
				  {
					"index": 34,
					"name": "NotListed"
				  },
				  {
					"index": 35,
					"name": "BidAlreadyExist"
				  },
				  {
					"index": 36,
					"name": "BidNotExist"
				  },
				  {
					"index": 37,
					"name": "NotInMarket"
				  },
				  {
					"index": 38,
					"name": "NotForSale"
				  },
				  {
					"index": 39,
					"name": "NotInSaleList"
				  },
				  {
					"index": 40,
					"name": "InvalidBidLength"
				  },
				  {
					"index": 41,
					"name": "InvalidCollectionOwner"
				  },
				  {
					"index": 42,
					"name": "InvalidTime"
				  },
				  {
					"index": 43,
					"name": "RewardStarted"
				  },
				  {
					"index": 44,
					"name": "RewardNotStarted"
				  },
				  {
					"index": 45,
					"name": "RewardNotAdded"
				  },
				  {
					"index": 46,
					"name": "ClaimMustBeFalse"
				  },
				  {
					"index": 47,
					"name": "HoldAmountBidderNotExist"
				  },
				  {
					"fields": [
					  {
						"type": 18,
						"typeName": "OwnableError"
					  }
					],
					"index": 48,
					"name": "OwnableError"
				  },
				  {
					"fields": [
					  {
						"type": 11,
						"typeName": "PSP22Error"
					  }
					],
					"index": 49,
					"name": "PSP22Error"
				  },
				  {
					"index": 50,
					"name": "CheckedOperations"
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
		}
	  ],
	  "version": "4"
	}
};
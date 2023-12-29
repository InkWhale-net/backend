const psp22_standard = {
  CONTRACT_ADDRESS: "5HgJNiF2bJkjqZ8M7HRdSuJ9Ho5EJhnpipEtF69FTo2XX1Hu",
  CONTRACT_ABI: {
	"source": {
	  "hash": "0x98cce11966e1b2638cae52ff2b62d28f83194c0141eb7ad530fb40686d6e4a0b",
	  "language": "ink! 4.3.0",
	  "compiler": "rustc 1.68.0",
	  "build_info": {
		"build_mode": "Release",
		"cargo_contract_version": "3.2.0",
		"rust_toolchain": "stable-x86_64-unknown-linux-gnu",
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
				"type": 1
			  }
			},
			{
			  "label": "symbol",
			  "type": {
				"displayName": [
				  "String"
				],
				"type": 1
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
		  "type": 3
		},
		"balance": {
		  "displayName": [
			"Balance"
		  ],
		  "type": 0
		},
		"blockNumber": {
		  "displayName": [
			"BlockNumber"
		  ],
		  "type": 5
		},
		"chainExtension": {
		  "displayName": [
			"ChainExtension"
		  ],
		  "type": 37
		},
		"hash": {
		  "displayName": [
			"Hash"
		  ],
		  "type": 35
		},
		"maxEventTopics": 4,
		"timestamp": {
		  "displayName": [
			"Timestamp"
		  ],
		  "type": 36
		}
	  },
	  "events": [
		{
		  "args": [
			{
			  "docs": [],
			  "indexed": true,
			  "label": "from",
			  "type": {
				"displayName": [
				  "Option"
				],
				"type": 27
			  }
			},
			{
			  "docs": [],
			  "indexed": true,
			  "label": "to",
			  "type": {
				"displayName": [
				  "Option"
				],
				"type": 27
			  }
			},
			{
			  "docs": [],
			  "indexed": false,
			  "label": "value",
			  "type": {
				"displayName": [
				  "Balance"
				],
				"type": 0
			  }
			}
		  ],
		  "docs": [],
		  "label": "Transfer"
		},
		{
		  "args": [
			{
			  "docs": [],
			  "indexed": true,
			  "label": "owner",
			  "type": {
				"displayName": [
				  "AccountId"
				],
				"type": 3
			  }
			},
			{
			  "docs": [],
			  "indexed": true,
			  "label": "spender",
			  "type": {
				"displayName": [
				  "AccountId"
				],
				"type": 3
			  }
			},
			{
			  "docs": [],
			  "indexed": false,
			  "label": "value",
			  "type": {
				"displayName": [
				  "Balance"
				],
				"type": 0
			  }
			}
		  ],
		  "docs": [],
		  "label": "Approval"
		}
	  ],
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
			  "label": "code_hash",
			  "type": {
				"displayName": [
				  "upgradeabletrait_external",
				  "SetCodeInput1"
				],
				"type": 4
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
			"type": 9
		  },
		  "selector": "0x9e32fab2"
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
				"type": 3
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
			"type": 9
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
			"type": 17
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
				"type": 3
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
				"type": 3
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
			"type": 9
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
				"type": 3
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
		  "default": false,
		  "docs": [],
		  "label": "PSP22Burnable::burn",
		  "mutates": true,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 19
		  },
		  "selector": "0x7a9da510"
		},
		{
		  "args": [
			{
			  "label": "spender",
			  "type": {
				"displayName": [
				  "psp22_external",
				  "IncreaseAllowanceInput1"
				],
				"type": 3
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
		  "default": false,
		  "docs": [],
		  "label": "PSP22::increase_allowance",
		  "mutates": true,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 19
		  },
		  "selector": "0x96d6b57a"
		},
		{
		  "args": [],
		  "default": false,
		  "docs": [],
		  "label": "PSP22::total_supply",
		  "mutates": false,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 21
		  },
		  "selector": "0x162df8c2"
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
				"type": 3
			  }
			},
			{
			  "label": "spender",
			  "type": {
				"displayName": [
				  "psp22_external",
				  "AllowanceInput2"
				],
				"type": 3
			  }
			}
		  ],
		  "default": false,
		  "docs": [],
		  "label": "PSP22::allowance",
		  "mutates": false,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 21
		  },
		  "selector": "0x4d47d921"
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
				"type": 3
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
				"type": 22
			  }
			}
		  ],
		  "default": false,
		  "docs": [],
		  "label": "PSP22::transfer",
		  "mutates": true,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 19
		  },
		  "selector": "0xdb20f9f5"
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
				"type": 3
			  }
			},
			{
			  "label": "to",
			  "type": {
				"displayName": [
				  "psp22_external",
				  "TransferFromInput2"
				],
				"type": 3
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
				"type": 22
			  }
			}
		  ],
		  "default": false,
		  "docs": [],
		  "label": "PSP22::transfer_from",
		  "mutates": true,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 19
		  },
		  "selector": "0x54b3c76e"
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
				"type": 3
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
		  "default": false,
		  "docs": [],
		  "label": "PSP22::decrease_allowance",
		  "mutates": true,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 19
		  },
		  "selector": "0xfecb57d5"
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
				"type": 3
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
		  "default": false,
		  "docs": [],
		  "label": "PSP22::approve",
		  "mutates": true,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 19
		  },
		  "selector": "0xb20f1bbd"
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
				"type": 3
			  }
			}
		  ],
		  "default": false,
		  "docs": [],
		  "label": "PSP22::balance_of",
		  "mutates": false,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 21
		  },
		  "selector": "0x6568382f"
		},
		{
		  "args": [],
		  "default": false,
		  "docs": [],
		  "label": "PSP22Capped::cap",
		  "mutates": false,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 21
		  },
		  "selector": "0xf40366b4"
		},
		{
		  "args": [],
		  "default": false,
		  "docs": [],
		  "label": "PSP22Metadata::token_symbol",
		  "mutates": false,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 23
		  },
		  "selector": "0x34205be5"
		},
		{
		  "args": [],
		  "default": false,
		  "docs": [],
		  "label": "PSP22Metadata::token_decimals",
		  "mutates": false,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 25
		  },
		  "selector": "0x7271b782"
		},
		{
		  "args": [],
		  "default": false,
		  "docs": [],
		  "label": "PSP22Metadata::token_name",
		  "mutates": false,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 23
		  },
		  "selector": "0x3d261bd4"
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
				"type": 3
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
		  "default": false,
		  "docs": [],
		  "label": "PSP22Mintable::mint",
		  "mutates": true,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 19
		  },
		  "selector": "0xfc3c75d4"
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
			"type": 26
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
				"type": 3
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
			"type": 28
		  },
		  "selector": "0x11f43efd"
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
			"type": 28
		  },
		  "selector": "0x5e228753"
		},
		{
		  "args": [
			{
			  "label": "role",
			  "type": {
				"displayName": [
				  "accesscontrol_external",
				  "HasRoleInput1"
				],
				"type": 5
			  }
			},
			{
			  "label": "address",
			  "type": {
				"displayName": [
				  "accesscontrol_external",
				  "HasRoleInput2"
				],
				"type": 27
			  }
			}
		  ],
		  "default": false,
		  "docs": [],
		  "label": "AccessControl::has_role",
		  "mutates": false,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 30
		  },
		  "selector": "0xc1d9ac18"
		},
		{
		  "args": [
			{
			  "label": "role",
			  "type": {
				"displayName": [
				  "accesscontrol_external",
				  "RenounceRoleInput1"
				],
				"type": 5
			  }
			},
			{
			  "label": "account",
			  "type": {
				"displayName": [
				  "accesscontrol_external",
				  "RenounceRoleInput2"
				],
				"type": 27
			  }
			}
		  ],
		  "default": false,
		  "docs": [],
		  "label": "AccessControl::renounce_role",
		  "mutates": true,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 32
		  },
		  "selector": "0xeaf1248a"
		},
		{
		  "args": [
			{
			  "label": "role",
			  "type": {
				"displayName": [
				  "accesscontrol_external",
				  "RevokeRoleInput1"
				],
				"type": 5
			  }
			},
			{
			  "label": "account",
			  "type": {
				"displayName": [
				  "accesscontrol_external",
				  "RevokeRoleInput2"
				],
				"type": 27
			  }
			}
		  ],
		  "default": false,
		  "docs": [],
		  "label": "AccessControl::revoke_role",
		  "mutates": true,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 32
		  },
		  "selector": "0x6e4f0991"
		},
		{
		  "args": [
			{
			  "label": "role",
			  "type": {
				"displayName": [
				  "accesscontrol_external",
				  "GrantRoleInput1"
				],
				"type": 5
			  }
			},
			{
			  "label": "account",
			  "type": {
				"displayName": [
				  "accesscontrol_external",
				  "GrantRoleInput2"
				],
				"type": 27
			  }
			}
		  ],
		  "default": false,
		  "docs": [],
		  "label": "AccessControl::grant_role",
		  "mutates": true,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 32
		  },
		  "selector": "0x4ac062fd"
		},
		{
		  "args": [
			{
			  "label": "role",
			  "type": {
				"displayName": [
				  "accesscontrol_external",
				  "GetRoleAdminInput1"
				],
				"type": 5
			  }
			}
		  ],
		  "default": false,
		  "docs": [],
		  "label": "AccessControl::get_role_admin",
		  "mutates": false,
		  "payable": false,
		  "returnType": {
			"displayName": [
			  "ink",
			  "MessageResult"
			],
			"type": 34
		  },
		  "selector": "0x83da3bb2"
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
							  "leaf": {
								"key": "0x270a8fc3",
								"ty": 0
							  }
							},
							"root_key": "0x270a8fc3"
						  }
						},
						"name": "supply"
					  },
					  {
						"layout": {
						  "root": {
							"layout": {
							  "leaf": {
								"key": "0xc2664826",
								"ty": 0
							  }
							},
							"root_key": "0xc2664826"
						  }
						},
						"name": "balances"
					  },
					  {
						"layout": {
						  "root": {
							"layout": {
							  "leaf": {
								"key": "0xf8d71e22",
								"ty": 0
							  }
							},
							"root_key": "0xf8d71e22"
						  }
						},
						"name": "allowances"
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
						  "root": {
							"layout": {
							  "enum": {
								"dispatchKey": "0x90a00b7d",
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
											"key": "0x90a00b7d",
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
							"root_key": "0x90a00b7d"
						  }
						},
						"name": "name"
					  },
					  {
						"layout": {
						  "root": {
							"layout": {
							  "enum": {
								"dispatchKey": "0xf8019f84",
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
											"key": "0xf8019f84",
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
							"root_key": "0xf8019f84"
						  }
						},
						"name": "symbol"
					  },
					  {
						"layout": {
						  "root": {
							"layout": {
							  "leaf": {
								"key": "0xd29264d8",
								"ty": 2
							  }
							},
							"root_key": "0xd29264d8"
						  }
						},
						"name": "decimals"
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
						  "root": {
							"layout": {
							  "leaf": {
								"key": "0x5fd98c24",
								"ty": 0
							  }
							},
							"root_key": "0x5fd98c24"
						  }
						},
						"name": "cap"
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
						  "root": {
							"layout": {
							  "leaf": {
								"key": "0x1f2cf4ac",
								"ty": 5
							  }
							},
							"root_key": "0x1f2cf4ac"
						  }
						},
						"name": "admin_roles"
					  },
					  {
						"layout": {
						  "root": {
							"layout": {
							  "leaf": {
								"key": "0x8150f558",
								"ty": 6
							  }
							},
							"root_key": "0x8150f558"
						  }
						},
						"name": "members"
					  }
					],
					"name": "Data"
				  }
				},
				"name": "access"
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
			"primitive": "str"
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
			"composite": {
			  "fields": [
				{
				  "type": 4,
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
		"id": 4,
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
		"id": 5,
		"type": {
		  "def": {
			"primitive": "u32"
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
		"id": 11,
		"type": {
		  "def": {
			"variant": {
			  "variants": [
				{
				  "fields": [
					{
					  "type": 1,
					  "typeName": "String"
					}
				  ],
				  "index": 0,
				  "name": "Custom"
				},
				{
				  "fields": [
					{
					  "type": 12,
					  "typeName": "OwnableError"
					}
				  ],
				  "index": 1,
				  "name": "OwnableError"
				},
				{
				  "fields": [
					{
					  "type": 13,
					  "typeName": "AccessControlError"
					}
				  ],
				  "index": 2,
				  "name": "AccessControlError"
				},
				{
				  "fields": [
					{
					  "type": 14,
					  "typeName": "PSP22Error"
					}
				  ],
				  "index": 3,
				  "name": "PSP22Error"
				},
				{
				  "fields": [
					{
					  "type": 15,
					  "typeName": "PSP34Error"
					}
				  ],
				  "index": 4,
				  "name": "PSP34Error"
				},
				{
				  "fields": [
					{
					  "type": 16,
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
				  "name": "CannotMintInwV2"
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
		"id": 13,
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
		"id": 14,
		"type": {
		  "def": {
			"variant": {
			  "variants": [
				{
				  "fields": [
					{
					  "type": 1,
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
					  "type": 1,
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
			"variant": {
			  "variants": [
				{
				  "fields": [
					{
					  "type": 1,
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
					  "type": 1,
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
		"id": 16,
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
		"id": 17,
		"type": {
		  "def": {
			"variant": {
			  "variants": [
				{
				  "fields": [
					{
					  "type": 18
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
			  "type": 18
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
			  "type": 0
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
					  "type": 6
					}
				  ],
				  "index": 0,
				  "name": "Ok"
				},
				{
				  "fields": [
					{
					  "type": 14
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
			  "type": 14
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
			"sequence": {
			  "type": 2
			}
		  }
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
					  "type": 24
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
			  "type": 24
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
				  "index": 0,
				  "name": "None"
				},
				{
				  "fields": [
					{
					  "type": 1
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
			  "type": 1
			}
		  ],
		  "path": [
			"Option"
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
					  "type": 2
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
			  "type": 2
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
			  "type": 27
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
		"id": 27,
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
					  "type": 3
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
			  "type": 3
			}
		  ],
		  "path": [
			"Option"
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
			  "type": 29
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
		"id": 29,
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
					  "type": 12
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
			  "type": 12
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
					  "type": 31
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
			  "type": 31
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
		"id": 31,
		"type": {
		  "def": {
			"primitive": "bool"
		  }
		}
	  },
	  {
		"id": 32,
		"type": {
		  "def": {
			"variant": {
			  "variants": [
				{
				  "fields": [
					{
					  "type": 33
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
			  "type": 33
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
		"id": 33,
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
			  "type": 6
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
		"id": 34,
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
		"id": 35,
		"type": {
		  "def": {
			"composite": {
			  "fields": [
				{
				  "type": 4,
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
		"id": 36,
		"type": {
		  "def": {
			"primitive": "u64"
		  }
		}
	  },
	  {
		"id": 37,
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

export default psp22_standard;
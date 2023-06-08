import dotenv from "dotenv";
dotenv.config();
export const pool_contract = (process.env.IS_MAINNET == "true") ? {
	CONTRACT_ADDRESS: "5Dts5wZHnjxQrr2MQ6cdUrn94Cu9svpMinWbHJase76rMVXR",
	CONTRACT_ABI: {
		"source": {
			"hash": "0x76c61a4f61bae8523f93458fea8b4dfba3ad30e617a7662dcd73a625ccab7b6f",
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
			"name": "nft_pool_generator",
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
							"label": "psp34_contract_address",
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
							"label": "multiplier",
							"type": {
								"displayName": [
									"Balance"
								],
								"type": 6
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
						"type": 16
					},
					"selector": "0x4fa43c8c"
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
						"type": 17
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
						"type": 17
					},
					"selector": "0x11f43efd"
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
						"type": 19
					},
					"selector": "0x476bc739"
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
						"type": 21
					},
					"selector": "0x79f903bb"
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
					"label": "GenericPoolGeneratorTrait::get_inw_contract",
					"mutates": false,
					"payable": false,
					"returnType": {
						"displayName": [
							"ink",
							"MessageResult"
						],
						"type": 16
					},
					"selector": "0xd6b47e7a"
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
						"type": 23
					},
					"selector": "0xd8207f36"
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
						"type": 25
					},
					"selector": "0xa4395f88"
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
						"type": 25
					},
					"selector": "0xea416566"
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
						"type": 26
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
						"name": "NFTPoolGenerator"
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
									"name": "PhaseNotActive"
								},
								{
									"index": 54,
									"name": "WhitelistBuyerInfoNotExist"
								},
								{
									"index": 55,
									"name": "WhitelistBuyerInfoExist"
								},
								{
									"index": 56,
									"name": "WhitelistBuyerPurchased"
								},
								{
									"index": 57,
									"name": "WhitelistSaleInfoNotExist"
								},
								{
									"index": 58,
									"name": "WhitelistPhaseAccountNotExist"
								},
								{
									"index": 59,
									"name": "InvalidPhaseForPublicSale"
								},
								{
									"index": 60,
									"name": "InvalidPhaseForWhitelistSale"
								},
								{
									"index": 61,
									"name": "InvalidSetActive"
								},
								{
									"index": 62,
									"name": "InvalidTotalAmount"
								},
								{
									"index": 63,
									"name": "CannotTransferTxFee"
								},
								{
									"index": 64,
									"name": "ActiveLaunchpadStatusNotFound"
								},
								{
									"index": 65,
									"name": "LaunchpadNotActive"
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
				"id": 21,
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
} : {
  CONTRACT_ADDRESS: "5HLm7SJTadZFpDMDXqGtPTig6EMHcBhghETSF5JZGi4JreJ8",
  CONTRACT_ABI: {
	  "source": {
		"hash": "0x2e9084cd6c8706462f7b921ebf6f62d5ec7fc6bf8acf37a5e72fe2061eba616f",
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
		"name": "my_pool",
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
				  "type": 4
				}
			  },
			  {
				"label": "apy",
				"type": {
				  "displayName": [
					"u32"
				  ],
				  "type": 7
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
			  },
			  {
				"label": "unstake_fee",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 4
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
			  "type": 8
			},
			"selector": "0x9bae9d5e"
		  }
		],
		"docs": [],
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
				"label": "token_contract",
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
				  "type": 4
				}
			  }
			],
			"docs": [],
			"label": "PoolStakeEvent"
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
				"label": "token_contract",
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
				  "type": 4
				}
			  }
			],
			"docs": [],
			"label": "PoolUnstakeEvent"
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
				"label": "token_contract",
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
				  "type": 4
				}
			  }
			],
			"docs": [],
			"label": "PoolClaimEvent"
		  }
		],
		"lang_error": {
		  "displayName": [
			"ink",
			"LangError"
		  ],
		  "type": 15
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
				  "type": 4
				}
			  },
			  {
				"label": "apy",
				"type": {
				  "displayName": [
					"u32"
				  ],
				  "type": 7
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
			  },
			  {
				"label": "unstake_fee",
				"type": {
				  "displayName": [
					"Balance"
				  ],
				  "type": 4
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
			  "type": 8
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
				  "type": 4
				}
			  }
			],
			"docs": [],
			"label": "stake",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
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
				  "type": 4
				}
			  }
			],
			"docs": [],
			"label": "unstake",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x82364901"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "claim_reward",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x9a8353a7"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "apy",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 16
			},
			"selector": "0x51564730"
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
			  "type": 17
			},
			"selector": "0x4fa43c8c"
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
			  "type": 18
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
			  "type": 18
			},
			"selector": "0x11f43efd"
		  },
		  {
			"args": [],
			"docs": [],
			"label": "GenericPoolContractTrait::is_topup_enough_reward",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 20
			},
			"selector": "0x7663de4d"
		  },
		  {
			"args": [],
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
			"args": [],
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
			"docs": [],
			"label": "GenericPoolContractTrait::set_inw_contract",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0xb89c001e"
		  },
		  {
			"args": [],
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
			"docs": [],
			"label": "GenericPoolContractTrait::get_stake_info",
			"mutates": false,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 23
			},
			"selector": "0x7d91f5c8"
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
				  "type": 4
				}
			  }
			],
			"docs": [],
			"label": "GenericPoolContractTrait::topup_reward_pool",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0xaaa53e1a"
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
				  "type": 4
				}
			  }
			],
			"docs": [],
			"label": "GenericPoolContractTrait::withdraw_reward_pool",
			"mutates": true,
			"payable": false,
			"returnType": {
			  "displayName": [
				"ink",
				"MessageResult"
			  ],
			  "type": 8
			},
			"selector": "0x7be928b9"
		  },
		  {
			"args": [],
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
			"args": [],
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
			  "type": 8
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
							  "ty": 4
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
										  "key": "0xf508dbf5",
										  "ty": 5
										}
									  },
									  "name": "last_reward_update"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0xf508dbf5",
										  "ty": 4
										}
									  },
									  "name": "staked_value"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0xf508dbf5",
										  "ty": 4
										}
									  },
									  "name": "unclaimed_reward"
									},
									{
									  "layout": {
										"leaf": {
										  "key": "0xf508dbf5",
										  "ty": 4
										}
									  },
									  "name": "future_reward"
									}
								  ],
								  "name": "StakeInformation"
								}
							  },
							  "root_key": "0xf508dbf5"
							}
						  },
						  "name": "stakers"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 6
							}
						  },
						  "name": "is_topup_enough_reward"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 4
							}
						  },
						  "name": "reward_pool"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 4
							}
						  },
						  "name": "total_unclaimed_reward"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 4
							}
						  },
						  "name": "max_staking_amount"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 4
							}
						  },
						  "name": "min_reward_amount"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 4
							}
						  },
						  "name": "total_staked"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 5
							}
						  },
						  "name": "duration"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 5
							}
						  },
						  "name": "start_time"
						},
						{
						  "layout": {
							"leaf": {
							  "key": "0x00000000",
							  "ty": 4
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
				  "name": "data"
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
			  "name": "MyPool"
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
			  "primitive": "u128"
			}
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
			  "primitive": "bool"
			}
		  }
		},
		{
		  "id": 7,
		  "type": {
			"def": {
			  "primitive": "u32"
			}
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
						"type": 9
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 9
			  },
			  {
				"name": "E",
				"type": 15
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
						"type": 3
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 10
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
				"type": 10
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
						"type": 11,
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
					"name": "WhitelistBuyerInfoNotExist"
				  },
				  {
					"index": 54,
					"name": "WhitelistBuyerInfoExist"
				  },
				  {
					"index": 55,
					"name": "WhitelistBuyerPurchased"
				  },
				  {
					"index": 56,
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
		  "id": 11,
		  "type": {
			"def": {
			  "primitive": "str"
			}
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
					"fields": [
					  {
						"type": 14,
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
						"type": 14,
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
			  "sequence": {
				"type": 2
			  }
			}
		  }
		},
		{
		  "id": 15,
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
		  "id": 16,
		  "type": {
			"def": {
			  "variant": {
				"variants": [
				  {
					"fields": [
					  {
						"type": 7
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 7
			  },
			  {
				"name": "E",
				"type": 15
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
						"type": 0
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 15
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
						"type": 15
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
				"type": 15
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
						"type": 3
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
				"type": 3
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
						"type": 15
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
				"type": 15
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
						"type": 4
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 15
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
						"type": 15
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
				"type": 15
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
						"type": 24
					  }
					],
					"index": 0,
					"name": "Ok"
				  },
				  {
					"fields": [
					  {
						"type": 15
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
				"type": 15
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
						"type": 25
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
				"type": 25
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
			  "composite": {
				"fields": [
				  {
					"name": "last_reward_update",
					"type": 5,
					"typeName": "u64"
				  },
				  {
					"name": "staked_value",
					"type": 4,
					"typeName": "Balance"
				  },
				  {
					"name": "unclaimed_reward",
					"type": 4,
					"typeName": "Balance"
				  },
				  {
					"name": "future_reward",
					"type": 4,
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
		}
	  ],
	  "version": "4"
	}
};
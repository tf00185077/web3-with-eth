export type TradeHistory = {
  blockNumber: string;
  blockHash: string;
  timeStamp: number;
  hash: string;
  nonce: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  input: string;
  methodId: string;
  functionName: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  txreceipt_status: string;
  gasUsed: string;
  confirmations: string;
  isError: string;
};

export const tokenDecimalsMap: { [contractAddress: string]: { decimals: number, symbol: string } } = {
  "0xdac17f958d2ee523a2206206994597c13d831ec7": { decimals: 6, symbol: "USDT" },   // USDT
  "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": { decimals: 6, symbol: "USDC" },   // USDC
  "0x6b175474e89094c44da98b954eedeac495271d0f": { decimals: 18, symbol: "DAI" },  // DAI
  "0x514910771af9ca656af840dff83e8264ecf986ca": { decimals: 18, symbol: "LINK" },  // LINK
  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599": { decimals: 8, symbol: "WBTC" },   // WBTC
  "0x4fabb145d64652a948d72533023f6e7a623c7c53": { decimals: 18, symbol: "BUSD" },  // BUSD
  "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0": { decimals: 18, symbol: "MATIC" },  // MATIC
  "0xae7ab96520de3a18e5e111b5eaab095312d7fe84": { decimals: 18, symbol: "stETH" },  // stETH
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": { decimals: 18, symbol: "WETH" },  // WETH
  "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE": { decimals: 18, symbol: "SHIBA INU" },  // SHIBA INU
};


export const tokenDataMap: Record<string, Record<string, { contract: string | null, chainId: number; }>> = {
  "USDT": {
    "Ethereum (ERC-20)": { contract: "0xdac17f958d2ee523a2206206994597c13d831ec7", chainId: 1 },
    "BSC (BEP-20)": { contract: "0x55d398326f99059ff775485246999027b3197955", chainId: 56 },
    "Polygon (ERC-20)": { contract: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", chainId: 137 }
  },
  "USDC": {
    "Ethereum (ERC-20)": { contract: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", chainId: 1 },
    "BSC (BEP-20)": { contract: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d", chainId: 56 },
    "Polygon (ERC-20)": { contract: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", chainId: 137 }
  },
  "ETH": {
    "Ethereum (ERC-20)": { contract: null, chainId: 1 },
    "BSC (BEP-20)": { contract: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", chainId: 56 },
    "Arbitrum (ERC-20)": { contract: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1", chainId: 42161 },
    "Optimism (ERC-20)": { contract: "0x4200000000000000000000000000000000000006", chainId: 10 }
  },
  "BNB": {
    "BSC (BEP-20)": { contract: null, chainId: 56 }
  },
  "MATIC": {
    "Polygon (ERC-20)": { contract: null, chainId: 137 },
    "Ethereum (ERC-20)": { contract: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0", chainId: 1 }
  }
};
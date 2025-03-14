import { Token } from "@/lib/type/token";
import { ethers } from "ethers";

export const getAllTokens = async (address: string): Promise<Token[]> => {
  const url = `https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?key=${process.env.COVALENT_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  const tokens = data.data.items.map((token: Token) => {
    return {
      contract_name: token.contract_name,
      contract_ticker_symbol: token.contract_ticker_symbol,
      balance: ethers.formatUnits(token.balance, token.contract_decimals),
    };
  });
  return tokens;
}


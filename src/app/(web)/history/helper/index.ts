import { ethers } from "ethers";
import { tokenDecimalsMap } from "./type";

const decodeInput = (input: string) => {
  const data = input.slice(10);  // 去掉方法 ID "0xa9059cbb"
  const recipientAddress = "0x" + data.slice(0, 64).slice(24);  // 後 40 位
  const valueHex = data.slice(64);  // 後 64 位
  const value = ethers.toBigInt("0x" + valueHex);  // 轉成 BigNumber
  return { recipientAddress, value };
};

const getTokenDecimals = (contractAddress: string) => {
  if (tokenDecimalsMap[contractAddress]) {
    return tokenDecimalsMap[contractAddress];
  } else {
    return { decimals: 18, symbol: "ETH" }; //預設18 ETH
  }
};

const convertAmount = (input: string, contractAddress: string) => {
  const { recipientAddress, value } = decodeInput(input);
  const { decimals, symbol } = getTokenDecimals(contractAddress);
  const humanAmount = ethers.formatUnits(value, decimals);
  return { recipientAddress, humanAmount, symbol };
};

const converETHAmount = (weiValue: string) => ethers.formatUnits(weiValue, 18);

export { convertAmount, converETHAmount };

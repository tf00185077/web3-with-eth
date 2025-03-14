import { ethers } from "ethers";

// 透過助記詞還原錢包
const mnemonic = process.env.MNEMONIC;
const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);
const hdNode = ethers.HDNodeWallet.fromPhrase(mnemonic!);
const wallet = hdNode.connect(provider);
const recipient = process.env.TO_ADDRESS; // 接收地址
const amount = ethers.parseUnits("0.1", 6); // 轉 0.1 USDT（USDT 小數位數是 6）

// ERC-20 標準 ABI
const erc20Abi = [
  "function transfer(address to, uint256 value) public returns (bool)"
];

export async function sendUSDT() {
  const usdtAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT 合約地址
  const contract = new ethers.Contract(usdtAddress, erc20Abi, wallet);

  console.log(`📤 正在發送 ${ethers.formatUnits(amount, 6)} USDT 到 ${recipient}`);

  const tx = await contract.transfer(recipient, amount);
  console.log("⏳ 交易送出，等待確認中...");
  await tx.wait();
  console.log(`✅ 交易成功！Hash: ${tx.hash}`);
}


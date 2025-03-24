'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TradeHistory } from "../helper/type";
import { useWallet } from "@/contexts/WalletContext";
import { convertAmount, converETHAmount } from "../helper";
export default function TradeImformation({ tradeHistory }: { tradeHistory: TradeHistory; }) {
  const { selectedWalletAddress } = useWallet();
  const isSend = tradeHistory.from.toLowerCase() === selectedWalletAddress.toLowerCase();
  const isETH = tradeHistory.input === "0x";
  return (
    <Card>
      <CardHeader>
        <CardTitle>{isSend ? "轉出" : "轉入"}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{isSend ? `To: ${tradeHistory.to}` : `From: ${tradeHistory.from}`}</p>
        {isETH && <p>{converETHAmount(tradeHistory.value)} ETH</p>}
        {!isETH && <p>轉帳細項: {convertAmount(tradeHistory.input, tradeHistory.to).humanAmount} {convertAmount(tradeHistory.input, tradeHistory.to).symbol}</p>}
        <p>時間:{new Date(tradeHistory.timeStamp * 1000).toLocaleString()}</p>
        <p className={tradeHistory.isError === "0" ? "text-green-500" : "text-red-500"}>狀態:{tradeHistory.isError === "0" ? "成功" : "失敗"}</p>
      </CardContent>
    </Card>
  );
}

'use client';
import { useWallet } from "@/contexts/WalletContext";
import { useEffect, useState } from "react";
import TradeImformation from "./TradeImformation";
import { TradeHistory } from "../helper/type";
export default function HistoryPage() {
  const { selectedWalletAddress } = useWallet();
  const [tradeHistory, setTradeHistory] = useState<TradeHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-wallet-trade-history/${selectedWalletAddress}`);
        if (!response.ok) setError(response.statusText);
        const data = await response.json();
        if (data.status === 'success') {
          setError(null);
          setTradeHistory(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTradeHistory();
  }, [selectedWalletAddress]);
  return (
    isLoading ? <div>Loading...</div> :
      error ? <div>{error}</div> :
        <div className="flex flex-col gap-4">
          {tradeHistory.map((item) => (
            <TradeImformation key={item.hash} tradeHistory={item} />
          ))}
        </div>
  );
}
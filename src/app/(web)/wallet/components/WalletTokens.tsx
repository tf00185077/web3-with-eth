'use client';
import TokenCard from "@/app/(web)/send/components/TokenCard";
import { useWallet } from "@/contexts/WalletContext";
export default function WalletTokens() {
  const { walletInformation } = useWallet();
  return <div className="flex flex-col gap-4">
    {walletInformation?.map((token) => (
      <TokenCard key={token.contract_ticker_symbol} token={token} />
    ))}
  </div>;
}
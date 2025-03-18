'use client';
import WalletFunction from "@/components/WalletFunction";
import { useWallet } from "@/contexts/WalletContext";
import { useState, useEffect } from 'react';
export default function WalletInformation() {
  const { walletInformation, pnl } = useWallet();
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    if (walletInformation?.length) {
      setTotalBalance((walletInformation.reduce((acc, curr) => acc + Number(curr.balance), 0)));
    }
  }, [walletInformation]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold">${totalBalance.toFixed(2)} USD</h1>
        <div className="text-sm font-bold">
          {Number(pnl) > 0 && <p className="text-green-500">US {pnl}%</p>}
          {Number(pnl) < 0 && <p className="text-red-500">US {pnl}%</p>}
          {Number(pnl) === 0 && <p className="text-gray-500">US 0%</p>}
        </div>
      </div>
      <WalletFunction />
    </div>
  );
}

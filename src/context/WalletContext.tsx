"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Wallet } from '@prisma/client';

type WalletContextType = {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
  selectedWalletAddress: Wallet['address'];
  selectWallet: (walletAddress: Wallet['address']) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode; }) {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWalletAddress, setSelectedWalletAddress] = useState<Wallet['address']>('');

  // 切換選中的錢包
  const selectWallet = (walletAddress: Wallet['address']) => {
    setSelectedWalletAddress(walletAddress);
  };

  useEffect(() => {
    console.log(selectedWalletAddress);
  }, [selectedWalletAddress]);

  return (
    <WalletContext.Provider value={{ wallets, selectedWalletAddress, setWallets, selectWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

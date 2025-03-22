"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Wallet } from '@prisma/client';

type WalletContextType = {
  wallets: Wallet[];
  setWallets: (wallets: Wallet[]) => void;
  selectedWalletAddress: Wallet['address'];
  selectWallet: (walletAddress: Wallet['address']) => void;
  walletInformation: TokenInformation[] | null;
  pnl: string;
};
export type TokenInformation = {
  contract_logo: string,
  contract_name: string,
  contract_ticker_symbol: string,
  balance: string,
  pretty_qoute: string,
  pretty_quote_24h: string,
  quote: number,
  quote_24hr: number,
  token_quantity: string,
};
const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode; }) {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWalletAddress, setSelectedWalletAddress] = useState<Wallet['address']>('');
  const [walletInformation, setWalletInformation] = useState<TokenInformation[] | null>(null);
  const [pnl, setPnl] = useState<string>('');
  // 切換選中的錢包
  const selectWallet = (walletAddress: Wallet['address']) => {
    setSelectedWalletAddress(walletAddress);
  };

  useEffect(() => {
    if (selectedWalletAddress) {
      const fetchWalletInformation = async () => {
        const walletInformation = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-wallet-erc20-information`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ address: selectedWalletAddress }),
        });
        const data = await walletInformation.json() as { tokens: TokenInformation[], pnl: string; };
        setWalletInformation(data.tokens);
        setPnl(data.pnl);
      };
      fetchWalletInformation();
    }
  }, [selectedWalletAddress]);

  return (
    <WalletContext.Provider value={{ wallets, selectedWalletAddress, setWallets, selectWallet, walletInformation, pnl }}>
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

'use client';

import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-label';
import { Wallet } from '@prisma/client';
import { useWallet } from '@/contexts/WalletContext';
export default function WalletSelector({ walletList }: { walletList: Wallet[]; }) {
  const { selectWallet } = useWallet();
  const [walletAddress, setWalletAddress] = useState<Wallet['address']>(walletList[0].address);
  useEffect(() => {
    selectWallet(walletAddress);
  }, [walletAddress, selectWallet]);
  return (
    <RadioGroup
      className="flex flex-col gap-4 w-full"
      defaultValue={walletList[0].address}
      onValueChange={(value) => { setWalletAddress(value); }}
    >
      {walletList.map((wallet, index) => (
        <div
          className="cursor-pointer flex items-center space-x-2 hover:border hover:border-gray-300 px-2 py-1 rounded-md data-[state=checked]:border-gray-300 data-[state=checked]:border-1"
          key={wallet.address}
          data-state={wallet.address === walletAddress ? "checked" : "unchecked"}
        >
          <RadioGroupItem value={wallet.address} id={wallet.address} />
          <Label
            className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap truncate cursor-pointer"
            htmlFor={wallet.address}
          >
            {wallet.wallet_nickname ? wallet.wallet_nickname : `Your Wallet ${index + 1}`}
          </Label>
          <Button className="cursor-pointer" variant="outline" size="icon">
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </RadioGroup>
  );
}

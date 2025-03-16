'use client';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { createWallet } from './helper';
import { useRouter } from 'next/navigation';
export function CreateWalletButton({ className }: { className?: string; }) {
  const router = useRouter();
  const handleCreateWallet = async () => {
    const url = new URL(window.location.href);
    const response = await createWallet();
    if (response.success) {
      router.push(url.pathname);
    }
  };
  return (
    <Button className={cn(className)} onClick={handleCreateWallet}>Create Wallet</Button>
  );
}


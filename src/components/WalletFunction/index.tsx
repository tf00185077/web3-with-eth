'use client';
import { Button } from '../ui/button';
import { BadgeDollarSign, ArrowRightLeft, Send, ArrowDown } from 'lucide-react';
import { useSlotControl } from '@/contexts/SlotControlContext';
export default function WalletFunction() {
  const { switchReceiveSlot, switchSendSlot } = useSlotControl();
  return (
    <div className="flex items-center justify-center gap-4">
      <Button disabled className='bg-green-500 text-white hover:bg-green-400 font-bold'>
        <BadgeDollarSign color='white' />
        Buy and Sell
      </Button>
      <Button disabled className='bg-green-500 text-white hover:bg-green-400 font-bold'>
        <ArrowRightLeft color='white' />
        Swap
      </Button>
      <Button className='bg-green-500 text-white hover:bg-green-400 font-bold' onClick={switchSendSlot}>
        <Send color='white' />
        Send
      </Button>
      <Button className='bg-green-500 text-white hover:bg-green-400 font-bold' onClick={switchReceiveSlot}>
        <ArrowDown color='white' />
        Receive
      </Button>
    </div>
  );
}


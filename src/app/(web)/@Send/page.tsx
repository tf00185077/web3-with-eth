
'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSlotControl } from "@/contexts/SlotControlContext";
import { useWallet } from "@/contexts/WalletContext";
import { useState } from "react";
import TokenCard from "./components/TokenCard";
export default function Send() {
  const { isSendSlotOpen, switchSendSlot } = useSlotControl();
  const { selectedWalletAddress, walletInformation } = useWallet();

  const [selectedToken, setSelectedToken] = useState<string>("");
  const [selectedChain, setSelectedChain] = useState<string>("");
  const [chains, setChains] = useState<string[]>([]);
  const [contract, setContract] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [openQRCode, setOpenQRCode] = useState<boolean>(false);

  const handleClose = () => {
    switchSendSlot();
  };

  return (
    <Dialog open={isSendSlotOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose a token</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {walletInformation?.map((token) => (
            <TokenCard key={token.contract_ticker_symbol} token={token} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
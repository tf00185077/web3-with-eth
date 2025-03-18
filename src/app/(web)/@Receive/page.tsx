'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSlotControl } from "@/contexts/SlotControlContext";
import { useWallet } from "@/contexts/WalletContext";
import { useState } from "react";
import { tokenDataMap } from "./helper";
import ReceiveQR from "./ReceiveQR";
export default function Receive() {
  const { isReceiveSlotOpen, switchReceiveSlot } = useSlotControl();
  const { selectedWalletAddress } = useWallet();

  const [selectedToken, setSelectedToken] = useState<string>("");
  const [selectedChain, setSelectedChain] = useState<string>("");
  const [chains, setChains] = useState<string[]>([]);
  const [contract, setContract] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [openQRCode, setOpenQRCode] = useState<boolean>(false);
  const handleTokenChange = (value: string) => {
    setSelectedToken(value);
    setChains(Object.keys(tokenDataMap[value]));
    setSelectedChain("");
    setContract(null);
    setChainId(null);
    setOpenQRCode(false);
  };

  const handleChainChange = (value: string) => {
    setSelectedChain(value);
    setOpenQRCode(false);
  };

  const handleConirm = () => {
    if (selectedToken && selectedChain) {
      setContract(tokenDataMap[selectedToken][selectedChain].contract);
      setChainId(tokenDataMap[selectedToken][selectedChain].chainId);
      setOpenQRCode(true);
    }
  };

  const handleClose = () => {
    setSelectedToken("");
    setSelectedChain("");
    setContract(null);
    setChainId(null);
    switchReceiveSlot();
    setOpenQRCode(false);
  };

  return (
    <Dialog open={isReceiveSlotOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Receive</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <Select onValueChange={handleTokenChange} value={selectedToken}>
            <SelectTrigger>
              <SelectValue placeholder="Choose Token" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(tokenDataMap).map((token) => (
                <SelectItem key={token} value={token}>
                  {token}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={handleChainChange} value={selectedChain}>
            <SelectTrigger>
              <SelectValue placeholder="Choose Chain" />
            </SelectTrigger>
            <SelectContent>
              {chains.map((chain) => (
                <SelectItem key={chain} value={chain}>
                  {chain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedToken && selectedChain && (
          <>
            <DialogDescription className="text-lg font-bold text-white">
              Recieve Address: {selectedWalletAddress}
            </DialogDescription>
            <DialogDescription>
              Recieve Token: {selectedToken}
            </DialogDescription>
            <DialogDescription>
              Recieve Chain: {selectedChain}
            </DialogDescription>
          </>
        )}
        {openQRCode && (
          <ReceiveQR address={selectedWalletAddress} chainId={chainId} contract={contract} />
        )}
        <DialogFooter className="flex gap-6">
          <Button disabled={!selectedToken || !selectedChain || openQRCode} className="bg-green-500 text-white hover:bg-green-400 font-bold" onClick={handleConirm}>Create Receive Address</Button>
          <Button className="bg-red-500 text-white hover:bg-red-400 font-bold" onClick={handleClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
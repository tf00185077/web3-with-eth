'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSlotControl } from "@/contexts/SlotControlContext";
import { useWallet } from "@/contexts/WalletContext";
import { useState } from "react";
import { tokens, tokenDataMap } from "./helper";
import ReceiveQR from "./ReceiveQR";
export default function Receive() {
  const { isReceiveSlotOpen, switchReceiveSlot } = useSlotControl();
  const { selectedWalletAddress } = useWallet();

  const [selectedToken, setSelectedToken] = useState<string>("");
  const [chains, setChains] = useState<string[]>([]);
  const [selectedChain, setSelectedChain] = useState<string>("");
  const [receiveAddress, setReceiveAddress] = useState<string>("");
  const [contract, setContract] = useState<string | null>("");
  const [chainId, setChainId] = useState<number | null>(null);
  const handleTokenChange = (value: string) => {
    setSelectedToken(value);
    setChains(tokens.find((token) => token.name === value)?.chains || []);
    setSelectedChain("");
    setContract(null);
    setChainId(null);
  };

  const handleChainChange = (value: string) => {
    setSelectedChain(value);
  };

  const handleConirm = () => {
    if (selectedToken && selectedChain) {
      setContract(tokenDataMap[selectedToken][selectedChain].contract);
      setChainId(tokenDataMap[selectedToken][selectedChain].chainId);
      setReceiveAddress(receiveAddress);
    }
  };
  const handleClose = () => {
    setSelectedToken("");
    setSelectedChain("");
    setContract(null);
    setChainId(null);
    switchReceiveSlot();
  };

  return (
    <Dialog open={isReceiveSlotOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Receive</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <Select onValueChange={handleTokenChange} >
            <SelectTrigger>
              <SelectValue placeholder="Choose Token" />
            </SelectTrigger>
            <SelectContent>
              {tokens.map((token) => (
                <SelectItem key={token.name} value={token.name}>
                  {token.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={handleChainChange} disabled={chains.length === 0}>
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
        {contract && chainId && (
          <ReceiveQR address={selectedWalletAddress} chainId={chainId} contract={contract} />
        )}
        <DialogFooter>
          <Button disabled={!selectedToken || !selectedChain} className="bg-green-500 text-white hover:bg-green-400 font-bold" onClick={handleConirm}>Create Receive Address</Button>
          <Button className="bg-red-500 text-white hover:bg-red-400 font-bold" onClick={handleClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
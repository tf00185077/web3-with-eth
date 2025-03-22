
'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSlotControl } from "@/contexts/SlotControlContext";
import { TokenInformation, useWallet } from "@/contexts/WalletContext";
import { useState, useEffect, useCallback } from "react";
import TokenCard from "./components/TokenCard";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { tokenDataMap } from "../@Receive/helper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
export default function Send() {
  const { isSendSlotOpen, switchSendSlot } = useSlotControl();
  const { walletInformation, selectedWalletAddress } = useWallet();
  const { data: session } = useSession();
  const [selectedToken, setSelectedToken] = useState<TokenInformation | null>(null);
  const [selectedChain, setSelectedChain] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [isTransferring, setIsTransferring] = useState<boolean>(false);
  const chooseTokenHandler = (token: TokenInformation) => {
    setSelectedToken(token);
  };

  const handleClose = useCallback(() => {
    resetSelectedToken();
    setSelectedChain(undefined);
    switchSendSlot();
  }, [switchSendSlot]);
  
  const resetSelectedToken = () => {
    setSelectedToken(null);
    setSelectedChain(undefined);
  };
  const handleChainChange = (value: string) => {
    setSelectedChain(value);
  };

  useEffect(() => {
    if (amount > Number(selectedToken?.balance)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [amount, selectedToken]);

  useEffect(() => {
    if (address === "" || amount <= 0 || selectedChain === undefined || selectedToken === null || amount > Number(selectedToken.balance)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [address, amount, selectedChain, selectedToken]);

  const handleClick = useCallback(async () => {
    if (isError) return;
    if (!selectedToken || !selectedChain) return;
    setIsTransferring(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transfer-token`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          contract: tokenDataMap[selectedToken.contract_ticker_symbol][selectedChain].contract,
          recipient: address,
          amount: amount.toString(),
          walletAddress: selectedWalletAddress,
          userId: session?.user?.id,
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        toast.success('Transfer successful');
      } else {
        toast.error('Transfer failed');
      }
    } catch (error) {
      toast.error('Transfer failed');
      console.error(error);
    } finally {
      handleClose();
      setIsTransferring(false);
    }
  }, [address, amount, selectedChain, selectedToken, isError, selectedWalletAddress, session?.user?.id, handleClose]);

  return (
    <Dialog open={isSendSlotOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose a {!selectedToken ? 'token' : 'chain'}</DialogTitle>
        </DialogHeader>
        <div className="flex relative overflow-hidden">
          <div className={cn("flex flex-col gap-4 min-w-full transition-all duration-300",
            selectedToken ? "-translate-x-full" : "translate-x-0")}>
            {walletInformation?.map((token) => (
              <TokenCard key={token.contract_ticker_symbol} token={token} onChooseToken={chooseTokenHandler} />
            ))}
          </div>
          <div className={cn("min-w-full h-full flex transition-all duration-300",
            selectedToken ? "-translate-x-full" : "")}>
            {selectedToken && (
              <div className="w-full flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Send {selectedToken.contract_ticker_symbol}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <Input type="text" placeholder="Recipient Address" onChange={(e) => setAddress(e.target.value)} />
                    <Select onValueChange={handleChainChange} value={selectedChain}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the chain" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(tokenDataMap[selectedToken.contract_ticker_symbol]).map((chain) => (
                          <SelectItem key={chain} value={chain}>{chain}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm text-gray-500">Amount:{selectedToken.balance}</Label>
                      <Input step={0.001} onChange={(e) => setAmount(Number(e.target.value))} type="number" placeholder="0.00" className={cn(amount > Number(selectedToken.balance) ? "border-red-500" : "")} />
                    </div>
                    {isError && amount > Number(selectedToken.balance) && <p className="text-red-500">Amount is not enough</p>}
                  </CardContent>
                  <CardFooter>
                    <Button
                      disabled={isError || isTransferring}
                      onClick={handleClick}
                      className='w-full bg-green-500 text-white hover:bg-green-400 font-bold'>
                      {isTransferring ? 'Transferring...' : 'Send'}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SlotControlContextType = {
  isReceiveSlotOpen: boolean;
  switchReceiveSlot: () => void;
  isSendSlotOpen: boolean;
  switchSendSlot: () => void;
};

const SlotControlContext = createContext<SlotControlContextType | undefined>(undefined);

export function SlotControlProvider({ children }: { children: ReactNode; }) {
  const [isReceiveSlotOpen, setIsReceiveSlotOpen] = useState(false);
  const [isSendSlotOpen, setIsSendSlotOpen] = useState(false);
  const switchReceiveSlot = () => {
    setIsReceiveSlotOpen(!isReceiveSlotOpen);
  };
  const switchSendSlot = () => {
    setIsSendSlotOpen(!isSendSlotOpen);
  };
  return (
    <SlotControlContext.Provider value={{ isReceiveSlotOpen, switchReceiveSlot, isSendSlotOpen, switchSendSlot }}>
      {children}
    </SlotControlContext.Provider>
  );
}

export function useSlotControl() {
  const context = useContext(SlotControlContext);
  if (!context) {
    throw new Error("useSlotControl must be used within a SlotControlProvider");
  }
  return context;
}

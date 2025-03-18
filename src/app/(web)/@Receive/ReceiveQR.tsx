import { QRCodeSVG } from "qrcode.react";

export default function ReceiveQR({ address, chainId, contract }: { address: string; chainId: number; contract?: string; }) {
  const qrValue = contract
    ? `ethereum:${address}@${chainId}${contract ? `/contract/${contract}` : ''}`
    : `ethereum:${address}@${chainId}`;

  return (
    <div className="flex justify-center">
      <QRCodeSVG 
        value={qrValue} 
        size={200}
        bgColor="#ffffff"
        fgColor="#000000"
      />
    </div>
  );
}

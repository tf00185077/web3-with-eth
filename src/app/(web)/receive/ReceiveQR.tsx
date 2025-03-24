import { QRCodeSVG } from "qrcode.react";

export default function ReceiveQR({ address, chainId = null, contract = null }: { address: string; chainId: number | null; contract: string | null; }) {
  const qrValue = `ethereum:${address}`
    + (chainId ? `?chain_id=${chainId}` : '')
    + (contract ? `&contract=${contract}` : '');

  return (
    <div className="flex justify-center">
      <QRCodeSVG
        value={qrValue}
        size={200}
        bgColor="#ffffff"
        fgColor="#000000"
      />
      <div>
        <p>{chainId}</p>
        <p>{contract}</p>
      </div>
    </div>
  );
}

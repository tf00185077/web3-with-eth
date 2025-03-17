import WalletFunction from "@/components/WalletFunction";
export default function WalletInformation() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold">$ 0.00USD</h1>
        <h4 className="text-sm text-gray-500 font-bold">+US$0 (+0.00%)</h4>
      </div>
      <WalletFunction />
    </div>
  );
}

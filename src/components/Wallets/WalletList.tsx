import { getWalletList } from "./helper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
export async function WalletList({ userId }: { userId: string; }) {
  if (!userId) {
    return <div>User ID is required</div>;
  }
  const walletList = await getWalletList(userId);
  return <RadioGroup defaultValue={walletList[0].id.toString()}>
    {walletList.map((wallet) => (
      <div className="flex items-center space-x-2" key={wallet.id}>
        <RadioGroupItem value={wallet.id.toString()} id={wallet.id.toString()} />
        <Label htmlFor={wallet.id.toString()}>{wallet.address}</Label>
      </div>
    ))}
  </RadioGroup>;
}
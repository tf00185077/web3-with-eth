import { getWalletList } from "./helper";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
export async function WalletList({ userId }: { userId: string; }) {
  if (!userId) {
    return <div>User ID is required</div>;
  }
  const walletList = await getWalletList(userId);
  return (
    <RadioGroup className="flex flex-col gap-4 w-full" defaultValue={walletList[0].id.toString()}>
      {walletList.map((wallet) => (
        <div className="flex items-center space-x-2" key={wallet.id}>
          <RadioGroupItem value={wallet.id.toString()} id={wallet.id.toString()} />
          <Label className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap  truncate" htmlFor={wallet.id.toString()}>{wallet.address}</Label>
          <Button className="cursor-pointer" variant="outline" size="icon">
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </RadioGroup>
  );
}
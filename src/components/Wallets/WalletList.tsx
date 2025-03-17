import { getWalletList } from "./helper";
import { Suspense } from 'react';
import WalletSelector from "./WalletSelector";
export async function WalletList({ userId }: { userId: string; }) {
  if (!userId) {
    return <div>User ID is required</div>;
  }
  const walletList = await getWalletList(userId);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WalletSelector walletList={walletList} />
    </Suspense>
  );
}
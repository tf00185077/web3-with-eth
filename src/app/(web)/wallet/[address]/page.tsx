import { Suspense } from 'react';
import Balance from './_components/Balance';
import { getAllTokens } from '@/lib/covalent/getToken';
export default async function WalletPage({ params }: { params: Promise<{ address: string; }>; }) {
    const { address } = await params;

    const tokens = await getAllTokens(address);
    return <div>
        WalletPage:
        <Suspense fallback={<div>Loading...</div>}>
            <Balance tokens={tokens} />
        </Suspense>
        <div>
            {address}
        </div>
    </div>;
}

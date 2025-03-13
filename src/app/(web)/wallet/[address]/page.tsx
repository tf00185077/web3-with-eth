export default async function WalletPage({ params }: { params: Promise<{ address: string }> }) {
    const { address } = await params;
    return <div>
        WalletPage
        <div>
            {address}
        </div>
    </div>;
}

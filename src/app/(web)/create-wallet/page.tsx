export default async function CreateWalletPage() {

    return <>
        <form action="/api/wallet" method="POST">
            <button type="submit">Create Wallet</button>
        </form>
    </>
}

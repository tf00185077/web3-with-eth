import { Token } from '@/lib/type/token';
export default function Balance({ tokens }: { tokens: Token[]; }) {
  const testSendTransfer = async () => {
    'use server'
    await fetch('http://localhost:3000/api/transfer', { method: 'POST' });
  }
  return <div>
    {tokens.map((token) => (
      <div key={token.contract_address + token.contract_ticker_symbol}>
        <div>{token.contract_name}</div>
        <div>{token.balance}</div>
        <button onClick={testSendTransfer}>Send USDT</button>
      </div>
    ))}
  </div>;
}

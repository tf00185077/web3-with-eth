import { Token } from '@/lib/type/token';
export default function Balance({ tokens }: { tokens: Token[]; }) {
  return <div>
    {tokens.map((token, index) => (
      <div key={token.contract_address + index}>
        <div>{token.contract_name}</div>
        <div>{token.balance}</div>
      </div>
    ))}
  </div>;
}

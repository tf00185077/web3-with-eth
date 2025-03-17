import { getTokenInformation } from "./helper";
import TokensList from "@/components/TokensList";
export default async function Tokens() {
  const famousTokens = ['BTC', 'ETH', 'SOL', 'DOGE', 'DOT', 'LINK', 'BCH', 'LTC', 'XLM', 'XMR', 'XRP', 'ADA'];
  const tokens = await Promise.all(famousTokens.map(async (token) => {
    const tokenInfo = await getTokenInformation(token);
    return tokenInfo;
  }));
  return (
    <div className="p-4 flex flex-col gap-6 w-full">
      <TokensList tokens={tokens} />
    </div>
  );
}

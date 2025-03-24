import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { TokenInformation } from "@/contexts/WalletContext";
import Image from "next/image";
const TokenCard = ({ token, onChooseToken }: { token: TokenInformation; onChooseToken?: (token: TokenInformation) => void; }) => {
  return (
    <Card className="flex flex-row justify-between cursor-pointer hover:bg-accent transition-colors duration-200" onClick={() => onChooseToken?.(token)}>
      <CardHeader className="flex gap-2">
        <div className="min-w-[32px]">
          <Image src={token.contract_logo} alt={token.contract_ticker_symbol} width={100} height={100} />
        </div>
        <div className="flex flex-col">
          <CardTitle>{token.contract_ticker_symbol}</CardTitle>
          <CardDescription className="text-muted-foreground text-sm text-nowrap">{`${Number(token.token_quantity).toFixed(10)} ${token.contract_ticker_symbol}`}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-end text-muted-foreground text-sm text-nowrap">
        &asymp;&nbsp;<p className="text-nowrap font-bold text-foreground">{token.pretty_qoute}</p>&nbsp;USD
      </CardContent>
    </Card>
  );
};

export default TokenCard;
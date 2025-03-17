import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { CircleArrowUp, CircleArrowDown } from "lucide-react";
import clsx from 'clsx';
export default function TokensList({ tokens }: { tokens: { symbol: string; price: number; priceChangePercent: number; quoteVolume: number; upOrDown: string; }[]; }) {
  return (
    <Table className="w-full">
      <TableCaption>Famous Tokens Information</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Symbol</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>24h 漲跌</TableHead>
          <TableHead>24h 交易量</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tokens.map((token) => (
          <TableRow key={token.symbol}>
            <TableCell className="font-medium">{token.symbol}</TableCell>
            <TableCell>{token.price}</TableCell>
            <TableCell className={clsx(
              token.upOrDown === 'up' ? 'text-green-500' : 'text-red-500',
              'flex items-center gap-2'
            )}>
              <p className="min-w-[50px]">{token.priceChangePercent}</p>
              {token.upOrDown === 'up' ? <CircleArrowUp className="w-4 h-4" /> : <CircleArrowDown className="w-4 h-4" />}
            </TableCell>
            <TableCell>{token.quoteVolume}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

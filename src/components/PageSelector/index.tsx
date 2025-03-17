'use client';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
export default function PageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const handleTabChange = (value: string) => {
    router.push(value);
  };
  return (
    <Tabs defaultValue="account" className="mt-4 w-full" onValueChange={handleTabChange}>
      <TabsList className="w-full flex justify-between gap-6 bg-transparent">
        <TabsTrigger className={clsx("cursor-pointer rounded-none border-b border-white border-x-0 border-t-0 py-4 hover:text-green-500", pathname === "/" && "border-b-green-500 text-green-500")} value="/">Tokens</TabsTrigger>
        <TabsTrigger className={clsx("cursor-pointer rounded-none border-b border-gray-300 border-x-0 border-t-0 py-4 hover:text-green-500", pathname === "/wallet" && "border-b-green-500 text-green-500")} value="wallet">Wallet</TabsTrigger>
        <TabsTrigger className={clsx("cursor-pointer rounded-none border-b border-gray-300 border-x-0 border-t-0 py-4 hover:text-green-500", pathname === "/history" && "border-b-green-500 text-green-500")} value="history">History</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}


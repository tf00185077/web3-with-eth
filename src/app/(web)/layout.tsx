import Receive from "./receive/page";
import Send from "./send/page";
export default function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="w-full flex flex-col gap-4">
      {children}
      <Receive />
      <Send />
    </div>
  );
}


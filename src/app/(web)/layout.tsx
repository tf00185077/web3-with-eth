export default function Layout({ children, Receive }: { children: React.ReactNode, Receive: React.ReactNode; }) {
  return (
    <div className="w-full flex flex-col gap-4">
      {children}
      {Receive}
    </div>
  );
}


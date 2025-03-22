export default function Layout({ children, Receive, Send }: { children: React.ReactNode, Receive: React.ReactNode, Send: React.ReactNode; }) {
  return (
    <div className="w-full flex flex-col gap-4">
      {children}
      {Receive}
      {Send}
    </div>
  );
}


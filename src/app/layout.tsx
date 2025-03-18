import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./ui/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MainLayoutSidebar } from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { WalletProvider } from "@/contexts/WalletContext";
import WalletInformation from "@/components/WalletInformation";
import PageSelector from "@/components/PageSelector";
import { SlotControlProvider } from "@/contexts/SlotControlContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "erc20 wallet",
  description: "erc20 wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <WalletProvider>
              <SlotControlProvider>
                <SidebarProvider>
                  <MainLayoutSidebar />
                  <SidebarTrigger />
                  <div className="p-4 flex flex-col gap-4 w-screen items-start justify-start">
                    <WalletInformation />
                    <PageSelector />
                    {children}
                  </div>
                </SidebarProvider>
              </SlotControlProvider>
            </WalletProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}

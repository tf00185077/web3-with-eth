import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ThemeProvider from "../ui/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MainLayoutSidebar } from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { WalletProvider } from "@/context/WalletContext";
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
              <SidebarProvider>
                <MainLayoutSidebar />
                <SidebarTrigger />
                {children}
              </SidebarProvider>
            </WalletProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

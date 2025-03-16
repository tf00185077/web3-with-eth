import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { UserData } from "./UserData";
import { AuthDialog } from "@/components/Dialog/AuthDialog";
import { auth } from "@/lib/utils";
import { LogoutButton } from "@/components/Auth/LogoutButton";
import { CreateWalletButton } from "@/components/Wallets/CreateWalletButton";
import { Suspense } from "react";
import { WalletList } from "@/components/Wallets/WalletList";
export async function MainLayoutSidebar() {
  const session = await auth.auth();
  return (
    <Sidebar variant="floating" >
      <SidebarHeader>
        <UserData userData={session?.user} />
      </SidebarHeader>
      {session?.user ?
        <SidebarContent >
          <SidebarGroup className="flex-1">
            <SidebarGroupLabel>Your Wallets</SidebarGroupLabel>
            <SidebarGroupContent>
              <Suspense fallback={<div>Loading...</div>}>
                <WalletList userId={session?.user?.id} />
              </Suspense>
            </SidebarGroupContent>
          </SidebarGroup>
          <CreateWalletButton />
        </SidebarContent>
        :
        <SidebarContent>
          <div>You need to log in to use this app</div>
        </SidebarContent>
      }
      <SidebarFooter className="mt-6">
        {session?.user ? <LogoutButton /> : <AuthDialog />}
      </SidebarFooter>
    </Sidebar >
  );
}
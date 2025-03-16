import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { MainContent } from "./MainContent";
import { UserData } from "./UserData";
import { AuthDialog } from "@/components/Dialog/AuthDialog";
import { auth } from "@/lib/utils";
import { LogoutButton } from "@/components/Auth/LogoutButton";
export async function MainLayoutSidebar() {
  const isLoggedIn = await auth.auth();
  return (
    <Sidebar>
      <SidebarHeader>
        <UserData />
      </SidebarHeader>
      <SidebarContent>
        <MainContent />
      </SidebarContent>
      <SidebarFooter>
        {isLoggedIn ? <LogoutButton /> : <AuthDialog />}
      </SidebarFooter>
    </Sidebar>
  );
}
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { MainContent } from "./MainContent";
import { UserData } from "./UserData";
export function MainLayoutSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <UserData />
      </SidebarHeader>
      <SidebarContent>
        <MainContent />
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
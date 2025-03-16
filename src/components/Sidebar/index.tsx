import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { MainContent } from "./MainContent";
export function MainLayoutSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <MainContent />
        <SidebarGroup />
        < SidebarGroup />
      </SidebarContent>
      < SidebarFooter />
    </Sidebar>
  );
}
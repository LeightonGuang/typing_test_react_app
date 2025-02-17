import { HistoryIconSvg, KeyboardIconSvg } from "./icons";
import {
  Sidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";

const AppSidebar = () => {
  const items: { title: string; href: string; icon?: React.ReactNode }[] = [
    { title: "Typing", href: "/", icon: <KeyboardIconSvg /> },
    { title: "History", href: "/history", icon: <HistoryIconSvg /> },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <span className="text-xl">The Next Typer</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a className="flex items-center gap-2" href={item.href}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

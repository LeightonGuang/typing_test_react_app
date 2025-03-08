"use client";

import { useEffect, useState } from "react";
import { HistoryIconSvg, KeyboardIconSvg, SettingIconSvg } from "./icons";
import {
  Sidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import { Separator } from "./ui/separator";

const AppSidebar = () => {
  const items: { title: string; href: string; icon?: React.ReactNode }[] = [
    { title: "Typing", href: "/", icon: <KeyboardIconSvg /> },
    { title: "History", href: "/history", icon: <HistoryIconSvg /> },
    { title: "Settings", href: "/setting", icon: <SettingIconSvg /> },
  ];

  const [version, setVersion] = useState<string>("");

  useEffect(() => {
    fetch("/version.json")
      .then((response) => response.json())
      .then((data) => setVersion(data.version))
      .catch(() => {
        setVersion("unknown");
      });
  }, []);

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-lg">The Next Typer</h1>
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

      <Separator />

      <SidebarFooter>
        <div className="flex justify-between text-muted-foreground">
          <span className="text-sm">{`© ${new Date().getFullYear()} The Next Typer`}</span>
          <span className="text-sm">v{version}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

"use client";

import { useEffect, useState } from "react";
import { HistoryIconSvg, KeyboardIconSvg } from "./icons";
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

const AppSidebar = () => {
  const items: { title: string; href: string; icon?: React.ReactNode }[] = [
    { title: "Typing", href: "/", icon: <KeyboardIconSvg /> },
    { title: "History", href: "/history", icon: <HistoryIconSvg /> },
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

      <SidebarFooter>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">{`© ${new Date().getFullYear()} The Next Typer`}</span>
          <span className="text-sm text-gray-400">v{version}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

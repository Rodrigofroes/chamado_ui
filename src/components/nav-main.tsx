"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuthStore } from "@/lib/store/authStore"

export function NavMain({
  items,
}: {
  items: {
    admin: { title: string; url: string; icon: LucideIcon }[];
    client: { title: string; url: string; icon: LucideIcon }[];
  }

}) {
  const { isAdmin } = useAuthStore();

  const path = usePathname();

  const getItems = () => {
    return isAdmin ? items.admin : items.client
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {getItems().map((item) => {
            const isActive = path === item.url;

            const IconComponent = item.icon;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} className={`h-10 hover:bg-primary hover:text-white transition-colors duration-200 ${isActive ? "bg-primary text-white" : ""}`}>
                  <IconComponent />
                  <Link href={item.url}>{item.title}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

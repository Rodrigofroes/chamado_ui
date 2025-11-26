"use client"

import * as React from "react"


import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BriefcaseBusiness, CogIcon, TicketPlus, UsersIcon, PieChart, List } from "lucide-react"
import { IconInnerShadowTop } from "@tabler/icons-react"

const data = {
  items: {
    admin: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: PieChart
      },
      {
        title: "Chamados",
        url: "/chamados",
        icon: List
      },
      {
        title: "Abrir Chamado",
        url: "/abrir-chamado",
        icon: TicketPlus
      },
      {
        title: "Setores",
        url: "/admin/setores",
        icon: BriefcaseBusiness
      },
      {
        title: "Usuarios",
        url: "/admin/usuarios",
        icon: UsersIcon
      },
      {
        title: "Configurações",
        url: "/admin/configuracoes",
        icon: CogIcon
      }
    ],
    client: [
      {
        title: "Abrir Chamado",
        url: "/abrir-chamado",
        icon: TicketPlus
      },
      {
        title: "Chamados",
        url: "/chamados",
        icon: List
      }
    ]
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Helpdesk.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}

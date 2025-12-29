"use client"

import * as React from "react"
import {
  Home,
  Building,
  Users,
  LucideIcon,
  Panda
} from "lucide-react"

import { NavMain } from "@/components/ui/navigation/nav-main"
import { NavUser } from "@/components/ui/navigation/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/Sidebar/index"

// Icon map to resolve icon names to components
const iconMap: Record<string, LucideIcon> = {
  Home,
  Building,
  Users,
}

export function AppSidebar({ user, navMain, ...props }: React.ComponentProps<typeof Sidebar> & { user: { name: string, email: string, avatar: string }, navMain: { title: string, url: string, icon: string }[] }) {
  // Resolve icon names to icon components
  const navMainWithIcons = React.useMemo(() => {
    return navMain.map(item => ({
      ...item,
      icon: item.icon ? iconMap[item.icon] : undefined,
    }))
  }, [navMain])
  return (
    <Sidebar collapsible="offcanvas" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/" className="flex items-center justify-center gap-2">
                <Panda className="w-6 h-6" />
                <span className="text-base font-semibold ">LaafStyl</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithIcons} />
      </SidebarContent>
      
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}

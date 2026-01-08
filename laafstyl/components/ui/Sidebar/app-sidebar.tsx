"use client"

import * as React from "react"
import {
  Home,
  Building,
  Users,
  LucideIcon,
  Panda
} from "lucide-react"
import { useRouter } from "next/navigation"

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

type Organization = {
    id: number
    name: string
    email: string
    description: string | null
    website: string
    phone_number: string | null
    address: string
    city: string | null
    country: string | null
    createdAt: string
    regionId: number | null
}

export function AppSidebar({ user, navMain, organization, ...props }: React.ComponentProps<typeof Sidebar> & { user: { name: string, email: string, avatar: string }, navMain: { title: string, url: string, icon: string }[], organization?: Organization | null }) {
  const router = useRouter()
  
  // Resolve icon names to icon components
  const navMainWithIcons = React.useMemo(() => {
    return navMain.map(item => ({
      ...item,
      icon: item.icon ? iconMap[item.icon] : undefined,
    }))
  }, [navMain])

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      const userStr = sessionStorage.getItem("user")
      if (userStr) {
        const parsedUser = JSON.parse(userStr)
        if (parsedUser.role === "SUPER") {
          router.push("/super")
        } else if (parsedUser.role === "ADMIN" && parsedUser.organizations && parsedUser.organizations.length > 0) {
          router.push(`/admin/${parsedUser.organizations[0].id}`)
        }
      }
    } catch (error) {
      router.push("/")
    }
  }
  return (
    <Sidebar collapsible="offcanvas" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:!p-1.5 cursor-pointer"
              onClick={handleLogoClick}
            >
              <div className="flex items-center justify-center gap-2">
                {organization ? (
                  <>
                    <Building className="w-6 h-6" />
                    <span className="text-base font-semibold truncate">{organization.name}</span>
                  </>
                ) : (
                  <>
                    <Panda className="w-6 h-6" />
                    <span className="text-base font-semibold ">LaafStyl</span>
                  </>
                )}
              </div>
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

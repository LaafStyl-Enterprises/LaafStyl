"use client"
import { AppSidebar } from "@/components/ui/Sidebar/app-sidebar"
import { SiteHeader } from "@/components/ui/Header/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/Sidebar/index"
import { usePathname } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname()
  const title = pathname.split("/").pop()?.toUpperCase()  || "Home"
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Home",
        url: "/super",
        icon: "Home",
      },
      {
        title: "Branches",
        url: "/super/branches",
        icon: "Building",
      },
      {
        title: "Users",
        url: "/super/users",
        icon: "Users",
      },
    ],
   
  }
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 60)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" navMain={data.navMain} user={data.user} />
      <SidebarInset>
        <SiteHeader title={title} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

"use client"
import { AppSidebar } from "@/components/ui/Sidebar/app-sidebar"
import { SiteHeader } from "@/components/ui/Header/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/Sidebar/index"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const params = useParams()
  const id = params.id as string
  const title = pathname.split("/").pop()?.toUpperCase() || "Home"
  const [user, setUser] = useState({ name: "", email: "" })

  useEffect(() => {
    try {
      const userStr = sessionStorage.getItem("user")
      if (userStr) {
        // Handle both cases: already a stringified JSON or might be "[object Object]"
        if (userStr === "[object Object]") {
          // If it's the invalid string, clear it and use default
          sessionStorage.removeItem("user")
          setUser({ name: "", email: "" })
        } else {
          const parsedUser = JSON.parse(userStr)
          setUser(parsedUser)
        }
      }
    } catch (error) {
      // If parsing fails, clear the invalid data
      sessionStorage.removeItem("user")
      setUser({ name: "", email: "" })
    }
  }, [])
  const data = {
    user: {
      name: user.name,
      email: user.email,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Home",
        url: `/admin/${id}`,
        icon: "Home",
      },
      {
        title: "Members",
        url: `/admin/${id}/members`,
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

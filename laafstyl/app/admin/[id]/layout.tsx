"use client"
import { AppSidebar } from "@/components/ui/Sidebar/app-sidebar"
import { SiteHeader } from "@/components/ui/Header/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/Sidebar/index"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useAuthFetch } from "@/hooks/useAuthFetch"

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

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const id = params.id as string
  const [user, setUser] = useState({ name: "", email: "" })
  const [organization, setOrganization] = useState<Organization | null>(null)

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

  useEffect(() => {
    const fetchOrganization = async () => {
      if (!id) return
      
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
        const response = await useAuthFetch(`/organization/${id}`, options)
        const result = await response.json()
        
        if (response.ok && result.success && result.data) {
          setOrganization(result.data)
        } else if (response.ok && result.name) {
          // Handle case where data might be directly in result
          setOrganization(result)
        }
      } catch (error) {
        console.error("Failed to fetch organization:", error)
      }
    }
    
    fetchOrganization()
  }, [id])
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
  if (organization?.name === "Laafstyl Mobility") {
    data.navMain.push({
      title: "Drivers",
      url: `/admin/${id}/drivers`,
      icon: "Truck",
    })
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
      <AppSidebar variant="inset" navMain={data.navMain} user={data.user} organization={organization} />
      <SidebarInset>
        <SiteHeader />
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

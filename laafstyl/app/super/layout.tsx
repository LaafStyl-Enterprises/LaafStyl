import { SidebarHeader, SidebarInset, SidebarProvider,SidebarTrigger } from "@/components/ui/Sidebar/index";
import { AppSidebar } from "@/components/ui/Sidebar/app-sidebar";
import { Inbox, Search, Settings, Home, Calendar, Building, Users } from "lucide-react";
import { SiteHeader } from "@/components/ui/Header/site-header";

export default function SuperLayout({children}:{children:React.ReactNode}) {
    const items = [
        {
        title: "Dashboard",
        url: "/super/",
        icon: Home,
        },
        {
        title: "Organizations",
        url: "/super/organizations",
        icon: Building,
        },
        {
        title: "Users",
        url: "/super/users",
        icon: Users,
        },
    
    ]
    return (
        <SidebarProvider>
            <AppSidebar items={items}/>
            <SidebarInset>
            <SidebarTrigger/>
                <main className="p-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

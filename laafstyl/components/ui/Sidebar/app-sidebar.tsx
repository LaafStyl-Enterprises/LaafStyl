import {Sidebar,SidebarContent,SidebarFooter,SidebarGroup,SidebarGroupLabel,SidebarGroupContent,SidebarMenu,SidebarMenuButton,SidebarMenuItem,SidebarHeader, SidebarRail} from "@/components/ui/Sidebar/index"
import { NavUser } from "../navigation/nav-user"
export function AppSidebar({items}:{items:any}){

    const data = {
      user:{
        name: "shadcn",
        email: "m@example.com",
        avatar: "https://github.com/shadcn.png",
      }
    }
    return (
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <img src="/Logo.jpeg" alt="logo" width={128} height={128} className="m-auto" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item:any) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <NavUser user={data.user} />
          </SidebarFooter>
        </Sidebar>
      )
}
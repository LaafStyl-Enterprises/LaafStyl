"use client"
import { Button } from "@/components/ui/Button/button"
import { cn } from "@/lib/utils"
import { PanelLeftIcon,MenuIcon } from "lucide-react"
import { useSidebar } from "@/hooks/useSidebar"

export function SidebarTrigger({
    className,
    onClick,
    ...props
  }: React.ComponentProps<typeof Button>) {
    const { toggleSidebar } = useSidebar()
  
    return (
      <Button
        data-sidebar="trigger"
        data-slot="sidebar-trigger"
        variant="ghost"
        size="icon"
        className={cn("size-14", className)}
        onClick={(event) => {
          onClick?.(event)
          toggleSidebar()
        }}
        {...props}
      >
        <MenuIcon className="size-6 " />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    )
  }
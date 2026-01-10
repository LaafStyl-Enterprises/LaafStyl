import * as React from "react"
import { MoreHorizontal, Mail, Phone, User, FileText } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/Avatar/avatar"
import { Button } from "@/components/ui/Button/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown/dropdown-menu"

type Document = {
    id: number
    driver_id: number
    document_type: string
    document_url: string
    verified: boolean
    createdAt: string
}

type Driver = {
    id: number
    user_id: number | null
    name: string
    email: string
    phone_number: string
    created_at: string
    documents: Document[]
    users: any | null
}

type DriverGroupMobileCardProps = {
  drivers: Driver[]
}

export function DriverGroupMobileCard({ drivers }: DriverGroupMobileCardProps) {
  if (!drivers || drivers.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-12 md:hidden">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="rounded-full bg-muted p-4">
            <User className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">No drivers found</p>
          <p className="text-xs text-muted-foreground">Drivers will appear here when added</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-3 p-4 md:hidden">
      {drivers.map((driver, index) => {
        const name = driver.name || "N/A"
        const nameParts = name.split(" ")
        const initials = nameParts.length >= 2
          ? `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase()
          : nameParts[0].charAt(0).toUpperCase() || "D"
        const documentCount = driver.documents?.length || 0

        return (
          <div
            key={driver.id || index}
            className="group rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 border-2 border-border">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{name}</h3>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 shrink-0 rounded-full hover:bg-muted"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => navigator.clipboard.writeText(driver.id.toString())}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1.5">
                  {driver.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{driver.email}</span>
                    </div>
                  )}
                  {driver.phone_number && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <span>{driver.phone_number}</span>
                    </div>
                  )}
                  {documentCount > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-3.5 w-3.5 shrink-0" />
                      <span>{documentCount} document{documentCount !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

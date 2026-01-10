import * as React from "react"
import { MoreHorizontal, Mail, Phone, User } from "lucide-react"

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

type User = {
    id: number
    stack_id: string
    first_name: string
    last_name: string
    phone_number: string
    role: string
    email: string
    createdAt: string
}

type UserGroupMobileCardProps = {
  users: User[]
}

export function UserGroupMobileCard({ users }: UserGroupMobileCardProps) {
  if (!users || users.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-12 md:hidden">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="rounded-full bg-muted p-4">
            <User className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">No users found</p>
          <p className="text-xs text-muted-foreground">Users will appear here when added</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-3 p-4 md:hidden">
      {users.map((user, index) => {
        const firstName = user.first_name || ""
        const lastName = user.last_name || ""
        const name = `${firstName} ${lastName}`.trim() || "N/A"
        const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.trim().toUpperCase() || "U"

        return (
          <div
            key={user.id || user.stack_id || index}
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
                    {user.role && (
                      <span className="mt-1.5 inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                        {user.role}
                      </span>
                    )}
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive"
                        onClick={() => navigator.clipboard.writeText(user.id.toString())}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-1.5">
                  {user.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                  )}
                  {user.phone_number && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <span>{user.phone_number}</span>
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

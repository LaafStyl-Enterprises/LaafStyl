"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/Button/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown/dropdown-menu"
type Organization = {
    id: number,
    name: string
    email: string
    phone: string
    address: string
    country: string
    website: string
}
export const columns: ColumnDef<Organization>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button 
                    variant="ghost" 
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                    Name
                    <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-50" />
                </Button>
            )
        },
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "Phone",
        accessorKey: "phone",
    },
    {
        header: "Address",
        accessorKey: "address",
    },
    {
        header: "Country",
        accessorKey: "country",
    },
    {
        header: "Website",
        accessorKey: "website",
    },
  {
    id: "actions",
    cell: ({ row }) => {
      const organization = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View organization</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500"
              onClick={() => navigator.clipboard.writeText(organization.id.toString())}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  // ...
]
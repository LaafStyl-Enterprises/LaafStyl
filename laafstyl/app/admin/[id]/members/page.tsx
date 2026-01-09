"use client"

import { DataTable } from "@/components/ui/Table/data-table"
import { Button } from "@/components/ui/Button/button"
import { Plus, MoreHorizontal, ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown/dropdown-menu"
import { AddMemberDialog } from "@/components/custom/organization/add-member"
import { useEffect, useState } from "react"
import { useAuthFetch } from "@/hooks/useAuthFetch"
import { useParams } from "next/navigation"

type User = {
    id: number
    stack_id: string
    first_name: string
    last_name: string
    phone_number: string
    role: string
    email: string
    createdAt: string
    name?: string // computed field for display
}

const columns: ColumnDef<User>[] = [
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
        cell: ({ row }) => {
            const firstName = row.original.first_name || ""
            const lastName = row.original.last_name || ""
            const name = `${firstName} ${lastName}`.trim() || "N/A"
            return <div>{name}</div>
        },
    },
    {
        header: "Email",
        accessorKey: "email",
    },
    {
        header: "Role",
        accessorKey: "role",
    },
    {
        header: "Phone",
        accessorKey: "phone_number",
        cell: ({ row }) => {
            const phone = row.original.phone_number
            return phone || "-"
        },
    },
    {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt)
            return date.toLocaleDateString()
        },
    },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500"
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function UsersPage() {
  const [data, setData] = useState<User[]>([])
  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
        const response = await useAuthFetch(`/organization/${id}/users`, options)
        const result = await response.json()
        
        // Handle response structure: { success, message, data: [...] }
        if (result.success && result.data) {
          setData(result.data)
        } else if (Array.isArray(result)) {
          setData(result)
        }
      } catch (error) {
        console.error("Failed to fetch users:", error)
      }
    }
    fetchData()
  }, [])
    
    return (
        <div>
            <div className="flex items-center justify-end p-4">
                <AddMemberDialog />
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

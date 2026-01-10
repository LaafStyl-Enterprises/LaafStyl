"use client"

import { DataTable } from "@/components/ui/Table/data-table"
import { Button } from "@/components/ui/Button/button"
import { Plus, MoreHorizontal, ArrowUpDown, FileText } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown/dropdown-menu"
import { AddDriverDialog } from "@/components/custom/drivers/add-driver"
import { DriverGroupMobileCard } from "@/components/custom/drivers/driver-group-mobilecard"
import { useEffect, useState } from "react"
import { useAuthFetch } from "@/hooks/useAuthFetch"
import { useParams } from "next/navigation"

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

const columns: ColumnDef<Driver>[] = [
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
        accessorKey: "phone_number",
        cell: ({ row }) => {
            const phone = row.original.phone_number
            return phone || "-"
        },
    },
    {
        header: "Documents",
        accessorKey: "documents",
        cell: ({ row }) => {
            const documents = row.original.documents || []
            return documents.length > 0 ? (
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>{documents.length} document{documents.length !== 1 ? 's' : ''}</span>
                </div>
            ) : "-"
        },
    },
    {
        header: "Created At",
        accessorKey: "created_at",
        cell: ({ row }) => {
            const date = new Date(row.original.created_at)
            return date.toLocaleDateString()
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const driver = row.original

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
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500"
                            onClick={() => navigator.clipboard.writeText(driver.id.toString())}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function DriversPage() {
    const [data, setData] = useState<Driver[]>([])
    const params = useParams()
    const organizationId = params?.id as string

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
                const response = await useAuthFetch(`/drivers?organization_id=${organizationId}`, options)
                const result = await response.json()
                
                if (result.success && result.data) {
                    setData(result.data)
                } else if (Array.isArray(result)) {
                    setData(result)
                }
            } catch (error) {
                console.error("Failed to fetch drivers:", error)
            }
        }
        fetchDrivers()
    }, [organizationId])
    
    return (
        <div>
            <div className="flex items-center justify-end p-4">
                <AddDriverDialog />
            </div>
            <div className="hidden md:block">
                <DataTable columns={columns} data={data} />
            </div>
            <DriverGroupMobileCard drivers={data} />
        </div>
    )
}
"use client"

import { DataTable } from "@/components/ui/Table/data-table"
import { Button } from "@/components/ui/Button/button"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown/dropdown-menu"
import { AddOrganizationModal } from "@/components/custom/organization/add-organization-modal"
import { MobileCards } from "@/components/custom/organization/mobile-cards"
import { useAuthFetch } from "@/hooks/useAuthFetch"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

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

const columns: ColumnDef<Organization>[] = [
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
        header: "Address",
        accessorKey: "address",
    },
    {
        header: "Description",
        accessorKey: "description",
        cell: ({ row }) => {
            const description = row.original.description
            return description || "-"
        },
    },
    {
        header: "Website",
        accessorKey: "website",
        cell: ({ row }) => {
            const website = row.original.website
            return website ? (
                <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {website}
                </a>
            ) : "-"
        },
    },
  {
    id: "actions",
    cell: ({ row }) => {
      const organization = row.original
      const router = useRouter();
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
            <DropdownMenuItem onClick={() => router.push(`/admin/${organization.id}`)}>View Organization</DropdownMenuItem>
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
]

export default function OrganizationsPage() {   
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const router = useRouter();
    useEffect(() => {
        const fetchOrganizations = async () => {
            const options = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
            const response = await useAuthFetch("/organization", options);
            const data = await response.json();
            
            // Handle response structure: either { success: true, organizations: [...] } or just [...]
            if (data.success && data.organizations) {
                setOrganizations(data.organizations);
            } else if (Array.isArray(data)) {
                setOrganizations(data);
            }
        }
        fetchOrganizations();
    }, []);
    return (
        <div>
            <div className="flex items-center justify-end p-4">
                <AddOrganizationModal />
            </div>
            {/* Mobile Cards View */}
            <div className="block md:hidden">
                <MobileCards data={organizations} />
            </div>
            {/* Desktop Table View */}
            <div className="hidden md:block">
                <DataTable columns={columns} data={organizations} />
            </div>
        </div>
    )
}
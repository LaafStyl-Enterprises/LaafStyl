import { DataTable } from "@/components/ui/Table/data-table"
import { columns } from "@/components/ui/Table/columns"
import { Button } from "@/components/ui/Button/button"
import { Plus } from "lucide-react"
export default function OrganizationsPage() {
    type Organization = {
        id: number,
        name: string
        email: string
        phone: string
        address: string
        country: string
        website: string
    }

   
    const data: Organization[] = [
        {
            id: 1,
            name: "Organization 1",
            email: "organization1@example.com",
            phone: "1234567890",
            address: "123 Main St, Anytown, USA",
            country: "USA",
            website: "https://www.organization1.com",
        },
        {
            id: 2,
            name: "Organization 2",
            email: "organization2@example.com",
            phone: "1234567890",
            address: "123 Main St, Anytown, USA",
            country: "USA",
            website: "https://www.organization2.com",
        },
    ]
    return (
        <div>
            <div className="flex items-center justify-end p-4">
            <Button><Plus className="w-4 h-4" /> Add Branch</Button>

            </div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
"use client"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/Item/item"
import { Building2 } from "lucide-react"
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

export function MobileCards({ data }: { data: Organization[] }) {
  const router = useRouter();
  const handleViewOrganization = (id: number) => {
    router.push(`/admin/${id}`);
  }
  return (
    <div className="flex w-full flex-col gap-4">
      <ItemGroup className="grid grid-cols-1 gap-4">
        {data.map((organization) => (
          <Item key={organization.id} variant="outline" className="!flex-col !items-start" onClick={() => handleViewOrganization(organization.id)}>
            <div className="flex w-full flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <ItemTitle>{organization.name}</ItemTitle>
              </div>
              <ItemDescription>{organization.email}</ItemDescription>
              {organization.description && (
                <div className="text-sm text-muted-foreground">
                  <p>{organization.description}</p>
                </div>
              )}
              {organization.phone_number && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Phone: </span>
                  {organization.phone_number}
                </div>
              )}
              {organization.address && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Address: </span>
                  {organization.address}
                </div>
              )}
              {organization.website && (
                <div className="text-sm">
                  <span className="font-medium text-muted-foreground">Website: </span>
                  <a
                    href={organization.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {organization.website}
                  </a>
                </div>
              )}
            </div>
          </Item>
        ))}
      </ItemGroup>
    </div>
  )
}

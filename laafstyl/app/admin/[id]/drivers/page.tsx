"use client"

import { AddDriverDialog } from "@/components/custom/organization/add-driver"

export default function DriversPage() {
    return (
        <div>
            <div className="flex items-center justify-end p-4">
                <AddDriverDialog />
            </div>
        </div>
    )
}
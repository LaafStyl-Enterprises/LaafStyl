"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog/dialog"
import { Input } from "@/components/ui/Input/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/Field/field"
import { Eye, EyeOff, Plus } from "lucide-react"
import { useAuthFetch } from "@/hooks/useAuthFetch"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/Spinner/spinner"

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

export function AddUserDialog() {
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<string>("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    
    const origin = window.location.origin
    const callback_url = `${origin}/reset-password`
    const verification_callback_url = `${origin}/handle/verify-email`
    
    const payload: Record<string, any> = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      phone_number: data.phone_number || "",
      role: data.role,
      callback_url: callback_url,
      verification_callback_url: verification_callback_url,
    }
    
    // Add organization_id only if role is ADMIN
    if (data.role === "ADMIN" && selectedOrganizationId) {
      payload.organization_id = parseInt(selectedOrganizationId as string)
    }
    
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      }
      const response = await useAuthFetch("/auth/create", options)
      const result = await response.json()
      
      if (response.ok && result.success) {
        toast.success(result.message || "User created successfully")
        setOpen(false)
        // Reset form state
        setSelectedRole("")
        setSelectedOrganizationId("")
        router.refresh()
      } else {
        toast.error(result.message || "Failed to create user")
      }
    } catch (error) {
      console.error("Failed to create user:", error)
      toast.error("Failed to create user")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchOrganizations = async () => {
      if (selectedRole === "ADMIN") {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
        try {
          const response = await useAuthFetch("/organization", options)
          const data = await response.json()
          
          // Handle response structure: either { success: true, organizations: [...] } or just [...]
          if (data.success && data.organizations) {
            setOrganizations(data.organizations)
          } else if (Array.isArray(data)) {
            setOrganizations(data)
          }
        } catch (error) {
          console.error("Failed to fetch organizations:", error)
        }
      } else {
        setOrganizations([])
        setSelectedOrganizationId("")
      }
    }
    fetchOrganizations()
  }, [selectedRole])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="w-4 h-4" /> Add Member</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new member account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                <Input 
                  id="first_name" 
                  name="first_name" 
                  placeholder="John" 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                <Input 
                  id="last_name" 
                  name="last_name" 
                  placeholder="Doe" 
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input 
                id="email" 
                name="email" 
                type="email"
                placeholder="user@example.com" 
                required 
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password" 
                  required 
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="phone_number">Phone</FieldLabel>
                <Input 
                  id="phone_number" 
                  name="phone_number" 
                  type="tel"
                  placeholder="1234567890" 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <select
                  id="role"
                  name="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a role</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="SUPER">SUPER</option>
                </select>
              </Field>
            </div>
            {selectedRole === "ADMIN" && (
              <Field>
                <FieldLabel htmlFor="organization">Organization</FieldLabel>
                <select
                  id="organization"
                  name="organization"
                  value={selectedOrganizationId}
                  onChange={(e) => setSelectedOrganizationId(e.target.value)}
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select an organization</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </Field>
            )}
          </FieldGroup>
          <DialogFooter className="gap-2 sm:gap-0 mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  Creating...
                </>
              ) : (
                "Create Member"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


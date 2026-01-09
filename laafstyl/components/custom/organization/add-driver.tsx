"use client"

import { useState } from "react"
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
import { Plus, ArrowLeft, Upload, X } from "lucide-react"
import { toast } from "sonner"
import { useRouter, useParams } from "next/navigation"
import { Spinner } from "@/components/ui/Spinner/spinner"

export function AddDriverDialog() {
  const [step, setStep] = useState(1)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [licensePreview, setLicensePreview] = useState<string | null>(null)
  const router = useRouter()
  const params = useParams()
  const organizationId = params?.id as string

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  })

  const handleStep1Next = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const data = new FormData(form)
    
    setFormData({
      first_name: data.get("first_name") as string,
      last_name: data.get("last_name") as string,
      email: data.get("email") as string,
      phone_number: data.get("phone_number") as string || "",
    })
    setStep(2)
  }

  const handleLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith("image/")) {
        setLicenseFile(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setLicensePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        toast.error("Please upload an image file")
      }
    }
  }

  const removeLicense = () => {
    setLicenseFile(null)
    setLicensePreview(null)
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!licenseFile) {
      toast.error("Please upload a license picture")
      return
    }

    setLoading(true)
    const submitData = new FormData()
    submitData.append("first_name", formData.first_name)
    submitData.append("last_name", formData.last_name)
    submitData.append("email", formData.email)
    submitData.append("phone_number", formData.phone_number)
    submitData.append("organization_id", organizationId)
    submitData.append("license", licenseFile)

    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}")
      const api_url = process.env.NEXT_PUBLIC_API_URL
      
      const response = await fetch(`${api_url}/driver`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user.access_token}`,
        },
        body: submitData,
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        toast.success(result.message || "Driver created successfully")
        setOpen(false)
        setStep(1)
        setFormData({ first_name: "", last_name: "", email: "", phone_number: "" })
        setLicenseFile(null)
        setLicensePreview(null)
        router.refresh()
      } else {
        toast.error(result.message || "Failed to create driver")
      }
    } catch (error) {
      console.error("Failed to create driver:", error)
      toast.error("Failed to create driver")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
    setStep(1)
    setFormData({ first_name: "", last_name: "", email: "", phone_number: "" })
    setLicenseFile(null)
    setLicensePreview(null)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleCancel()
    } else {
      setOpen(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button><Plus className="w-4 h-4" /> Add Driver</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Driver</DialogTitle>
          <DialogDescription>
            {step === 1 ? "Enter driver information" : "Upload driver license"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <form onSubmit={handleStep1Next}>
            <FieldGroup className="gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                  <Input 
                    id="first_name" 
                    name="first_name" 
                    placeholder="John" 
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                  <Input 
                    id="last_name" 
                    name="last_name" 
                    placeholder="Doe" 
                    required
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input 
                  id="email" 
                  name="email" 
                  type="email"
                  placeholder="driver@example.com" 
                  required 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
                <Input 
                  id="phone_number" 
                  name="phone_number" 
                  type="tel"
                  placeholder="1234567890" 
                  required
                />
              </Field>
            </FieldGroup>
            <DialogFooter className="gap-2 sm:gap-0 mt-6">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Next</Button>
            </DialogFooter>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleFinalSubmit}>
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="license">Driver License</FieldLabel>
                {!licensePreview ? (
                  <div className="border-2 border-dashed border-input rounded-md p-6 text-center">
                    <input
                      type="file"
                      id="license"
                      accept="image/*"
                      onChange={handleLicenseUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="license"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload license picture
                      </span>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={licensePreview}
                      alt="License preview"
                      className="w-full h-auto rounded-md border border-input"
                    />
                    <button
                      type="button"
                      onClick={removeLicense}
                      className="absolute top-2 right-2 p-1 bg-background border border-input rounded-full hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </Field>
            </FieldGroup>
            <DialogFooter className="gap-2 sm:gap-0 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                disabled={loading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button type="submit" disabled={loading || !licenseFile}>
                {loading ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create Driver"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}


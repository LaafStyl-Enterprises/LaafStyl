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
import { Eye, EyeOff, MapPin, Plus } from "lucide-react"
import { useAuthFetch } from "@/hooks/useAuthFetch"

export function AddOrganizationModal() {
  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
    const response = await useAuthFetch("/organization", options);
    if (response.ok) {
      toast.success("Organization created successfully");
      Dialog.close();
    } else {
      toast.error("Failed to create organization");
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Plus className="w-4 h-4" /> Add Organization</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Organization</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new organization.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handlesubmit}>
          <FieldGroup className="gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="Organization Name" 
                  required 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input 
                  id="email" 
                  name="email" 
                  placeholder="organization@example.com" 
                  required 
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="phone_number">Phone</FieldLabel>
              <Input 
                id="phone_number" 
                name="phone_number" 
                type="tel"
                placeholder="1234567890" 
                required 
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <div className="relative">
                <Input 
                  id="address" 
                  name="address" 
                  type="text"
                  placeholder="123 Main St, Anytown, USA" 
                  required 
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Show address"
                >
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="country">Country</FieldLabel>
                <Input 
                  id="country" 
                  name="country" 
                  type="text"
                  placeholder="United States" 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="website">Website</FieldLabel>
                <Input
                  id="website"
                  name="website"
                  type="text"
                  placeholder="https://www.example.com" 
                  // required 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="city">City</FieldLabel>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Anytown" 
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Description of the organization" 
                />
              </Field>
            </div>
          </FieldGroup>
          <DialogFooter className="gap-2 sm:gap-0 mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Organization</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


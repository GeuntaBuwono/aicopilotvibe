"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type CredentialDeliveryProps = {
  orderId: string
  userEmail: string
  userName: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeliveryComplete: () => void
}

export function CredentialDelivery({
  orderId,
  userEmail,
  userName,
  open,
  onOpenChange,
  onDeliveryComplete,
}: CredentialDeliveryProps) {
  const [isDelivering, setIsDelivering] = useState(false)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    notes: "",
  })

  const handleDelivery = async () => {
    if (!credentials.email || !credentials.password) {
      alert("Please provide both email and password")
      return
    }

    setIsDelivering(true)

    try {
      const response = await fetch(`/api/admin/orders/${orderId}/deliver`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enterpriseEmail: credentials.email,
          enterprisePassword: credentials.password,
          deliveryNotes: credentials.notes,
        }),
      })

      if (response.ok) {
        alert("Credentials delivered successfully!")
        onDeliveryComplete()
      } else {
        alert("Failed to deliver credentials")
      }
    } catch (error) {
      console.error("Error delivering credentials:", error)
      alert("Error delivering credentials")
    } finally {
      setIsDelivering(false)
    }
  }

  const generateRandomCredentials = () => {
    const domains = ["gmail.com", "outlook.com", "yahoo.com", "protonmail.com"]
    const randomDomain = domains[Math.floor(Math.random() * domains.length)]
    const randomEmail = `aiuser${Math.floor(Math.random() * 10000)}@${randomDomain}`
    const randomPassword = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    setCredentials({
      ...credentials,
      email: randomEmail,
      password: randomPassword,
    })
  }

  const handleCancel = () => {
    onOpenChange(false)
    onDeliveryComplete()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Deliver Enterprise Credentials</DialogTitle>
          <DialogDescription>
            Delivering credentials to: <strong>{userName}</strong> ({userEmail})
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="enterprise-email">
              Enterprise Email <span className="text-red-500">*</span>
            </Label>
            <div className="flex gap-2">
              <Input
                id="enterprise-email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder="Enter enterprise email..."
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={generateRandomCredentials} size="sm">
                Generate
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter password..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={credentials.notes}
              onChange={(e) => setCredentials({ ...credentials, notes: e.target.value })}
              placeholder="Any additional instructions or notes..."
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleDelivery} disabled={isDelivering}>
            {isDelivering ? "Delivering..." : "Deliver Credentials"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

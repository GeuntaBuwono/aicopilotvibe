"use client"

import { Calendar, Edit, Mail, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface UserProfileProps {
  user: {
    name: string
    email: string
    avatar?: string
    role: string
    joinDate: string
    subscriptionStatus: string
    lastLogin?: string
  }
  className?: string
  onEdit?: () => void
}

export function UserProfile({ user, className, onEdit }: UserProfileProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "inactive":
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-xl text-white">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {user.email}
            </CardDescription>
          </div>

          <Badge className={cn("text-xs", getStatusColor(user.subscriptionStatus))}>
            {user.subscriptionStatus.charAt(0).toUpperCase() + user.subscriptionStatus.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              Role
            </div>
            <span className="font-medium">{user.role}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Joined
            </div>
            <span className="font-medium">{user.joinDate}</span>
          </div>

          {user.lastLogin && (
            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Last Login
              </div>
              <span className="font-medium">{user.lastLogin}</span>
            </div>
          )}
        </div>

        <Separator />

        <Button variant="outline" className="group w-full" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  )
}

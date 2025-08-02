"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, ChevronDown } from "lucide-react"
import { logoutAction } from "../actions/auth"

interface UserMenuProps {
  user: { email: string; name: string }
  onLogout: () => void
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const [logoutState, logoutFormAction, isLogoutPending] = useActionState(logoutAction, null)

  // Handle successful logout
  if (logoutState?.success) {
    onLogout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-sm">{user.name}</span>
            <ChevronDown className="h-3 w-3" />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white" align="end">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>

        <DropdownMenuSeparator className="bg-gray-700" />

        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
          <User className="h-4 w-4 mr-2" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-700" />

        <DropdownMenuItem
          className="text-red-400 hover:text-red-300 hover:bg-gray-700"
          onClick={() => logoutFormAction()}
          disabled={isLogoutPending}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {isLogoutPending ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

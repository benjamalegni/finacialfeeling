"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, ChevronDown, Send } from "lucide-react"
import AuthForm from "./components/auth-form"
import UserMenu from "./components/user-menu"

export default function Component() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const [showAuth, setShowAuth] = useState(false)

  const useCases = [
    {
      title: "Earnings Play",
      description:
        "Xynth comes up with a 40%+ trade by scanning over 500 stocks and their historical earnings performances.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Day Trading",
      description:
        "Xynth discovers optimal day trading stocks and suggest a strategy to implement and make money on it",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Options Trading",
      description: "Xynth analyzes a weekly options chain to spot high-probability trades.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Finding undervalued stocks",
      description:
        "Xynth searches through reddit, X, and key financial metrics to find and compare undervalued AI stocks.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const handleAuthSuccess = (userData: { email: string; name: string }) => {
    setUser(userData)
    setShowAuth(false)
  }

  const handleLogout = () => {
    setUser(null)
  }

  // Show auth form if user clicks login or if not authenticated and trying to use features
  if (showAuth) {
    return <AuthForm onSuccess={handleAuthSuccess} onBack={() => setShowAuth(false)} />
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-black border-r border-gray-800 flex flex-col items-center py-4 space-y-4">
        <div className="text-white text-xl font-bold">X</div>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Plus className="h-4 w-4" />
        </Button>
        <div className="flex-1" />
        <div className="space-y-2">
          <div className="w-8 h-8 bg-gray-700 rounded"></div>
          <div className="w-4 h-4 bg-gray-600 rounded mx-auto"></div>
          <div className="w-4 h-4 bg-gray-600 rounded mx-auto"></div>
          <div className="w-4 h-4 bg-gray-600 rounded mx-auto"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-16 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with Auth */}
          <div className="flex justify-between items-center mb-8">
            <div></div>
            <div>
              {user ? (
                <UserMenu user={user} onLogout={handleLogout} />
              ) : (
                <Button onClick={() => setShowAuth(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign In
                </Button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">
              {user ? `Welcome back, ${user.name}!` : "What markets can I help you explore?"}
            </h1>
            {user && <p className="text-gray-400 mb-8">Ready to dive into your next trading opportunity?</p>}

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative bg-gray-900 rounded-lg border border-gray-700 p-4">
                <div className="flex items-center space-x-3">
                  <Input
                    placeholder={
                      user
                        ? "Ask Xynth about any asset or strategy..."
                        : "Sign in to collaborate with Xynth on any asset"
                    }
                    className="bg-transparent border-none text-white placeholder-gray-400 flex-1 focus-visible:ring-0"
                    disabled={!user}
                  />
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" disabled={!user}>
                      <span className="text-sm">Claude 3.7 Sonnet</span>
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" disabled={!user}>
                      <span className="text-sm">Tools</span>
                      <Plus className="h-3 w-3 ml-1" />
                    </Button>
                    <Button size="icon" className="bg-blue-600 hover:bg-blue-700" disabled={!user}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              {!user && (
                <p className="text-gray-500 text-sm mt-2">
                  <Button
                    variant="link"
                    onClick={() => setShowAuth(true)}
                    className="text-blue-400 hover:text-blue-300 p-0"
                  >
                    Sign in
                  </Button>{" "}
                  to start collaborating with Xynth
                </p>
              )}
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6 text-center">Explore use cases</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <Card
                  key={index}
                  className={`bg-gray-900 border-gray-700 transition-colors cursor-pointer ${
                    user ? "hover:bg-gray-800" : "opacity-75"
                  }`}
                  onClick={() => !user && setShowAuth(true)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
                      <img
                        src={useCase.image || "/placeholder.svg"}
                        alt={useCase.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2">{useCase.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{useCase.description}</p>
                      {!user && <p className="text-xs text-blue-400 mt-2">Sign in to explore</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

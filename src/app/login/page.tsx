"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { userLogin } from "@/services/actions/userlogin"

export default function LoginPage({
  className,
}: {
  className?: string;
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("admin")
  const [password, setPassword] = useState("password1")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await userLogin({
        name: username,
        password: password,
        rememberMe: true,
      })
      
      // userLogin will handle the redirect
      
    } catch (error) {
      console.error('Login error:', error)
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An error occurred during login. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
        <div className={cn("flex flex-col gap-6 w-[500px]", className)}>
      <Card className="border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm bg-white/80">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/logo.png"
              alt="ForensiCare Logo"
              width={40}
              height={40}
              className="dark:invert"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              ForensiCare
            </h1>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-blue-600">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-blue-200 focus:border-blue-500"
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-blue-600">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="password1"
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-blue-200 focus:border-blue-500"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <a
                  href="#"
                  className="text-sm text-right text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              
              <div className="text-center text-sm text-gray-500">
                <p>✅ Demo credentials auto-filled for fast development</p>
                  <p className="text-xs text-green-600">Username: admin | Password: password1</p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}

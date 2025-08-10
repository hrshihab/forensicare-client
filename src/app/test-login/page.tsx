"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestLoginPage() {
  const [testResult, setTestResult] = useState<string>('')

  const testLogin = async () => {
    try {
      setTestResult('Testing login...')
      
      const res = await fetch("/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: "detective_jon",
          password: "forensic123"
        })
      });

      const result = await res.json()
      setTestResult(`Login test result: ${JSON.stringify(result, null, 2)}`)
      
      if (result.token) {
        // Test token decode
        const { jwtDecode } = await import('jwt-decode')
        const decoded = jwtDecode(result.token)
        setTestResult(prev => prev + `\n\nDecoded token: ${JSON.stringify(decoded, null, 2)}`)
      }
      
    } catch (error) {
      setTestResult(`Error: ${error}`)
    }
  }

  const testCookie = () => {
    const { Cookies } = require('js-cookie')
    const token = Cookies.get('accessToken')
    setTestResult(`Cookie test: ${token ? 'Token exists' : 'No token'}`)
  }

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Login Test Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testLogin}>Test Login API</Button>
          <Button onClick={testCookie} variant="outline">Test Cookie</Button>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {testResult}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
} 
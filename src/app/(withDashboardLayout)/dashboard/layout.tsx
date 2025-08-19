"use client"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import * as React from "react"

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  // Dynamic breadcrumb logic
  // const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  // const segments = pathname.split("/").filter(Boolean)
  // const buildPath = (idx: number) => "/" + segments.slice(0, idx + 1).join("/")

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-x-hidden ">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

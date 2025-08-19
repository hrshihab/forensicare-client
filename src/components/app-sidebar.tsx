// src/components/app-sidebar.tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { USER_ROLE, UserRole } from "@/constants/roles"
import { getMenuItems } from "@/utils/sidebar-menu"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Send } from "lucide-react"
import { LifeBuoy } from "lucide-react"
import useUserInfo from "@/hooks/useUserInfo"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const userInfo = useUserInfo();
  const [mounted, setMounted] = React.useState(false);
  const [query, setQuery] = React.useState("");

  // Determine role from user info or fallback to URL
  const getRole = (): UserRole => {
    if (userInfo?.role) {
      return userInfo.role as UserRole;
    }
    // Fallback to URL-based role detection
    const pathSegments = pathname.split('/');
    const roleFromPath = pathSegments[2];
    return roleFromPath === 'admin' ? USER_ROLE.ADMIN : USER_ROLE.USER;
  };

  const role = getRole();

  React.useEffect(() => {
    // Mark mounted once, but do not alter UI between SSR and CSR
    setMounted(true);
  }, []);

  const data = {
    user: {
      name: userInfo?.username || "ForensiCare",
      email: userInfo?.email || "admin@forensicare.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: getMenuItems(role),
    navSecondary: [
      {
        title: "Support", 
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
  }

  const filteredNavMain = React.useMemo(() => {
    if (!query.trim()) return data.navMain;
    const q = query.toLowerCase();
    return data.navMain
      .map((item) => {
        const matchesSelf = item.title.toLowerCase().includes(q);
        const matchedSubs = item.items?.filter((s) => s.title.toLowerCase().includes(q)) || [];
        if (matchesSelf) return { ...item };
        if (matchedSubs.length) return { ...item, items: matchedSubs };
        return null;
      })
      .filter(Boolean) as typeof data.navMain;
  }, [data.navMain, query]);

  // Don't render until mounted to prevent hydration mismatch
  // Always render the same structure during SSR and CSR to avoid hydration mismatches

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/dashboard/${role}`}>
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/logo.png" alt="ForensiCare" width={36} height={36} />
                </div>
                <div className="grid flex-1 text-left text-2xl leading-tight">
                  <span className="truncate font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">ForensiCare</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-2 pb-1">
          <SidebarInput
            placeholder="Search menu..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <NavMain items={filteredNavMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
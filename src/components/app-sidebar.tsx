// src/components/app-sidebar.tsx
"use client"

import * as React from "react"
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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Send } from "lucide-react"
import { LifeBuoy } from "lucide-react"
import useUserInfo from "@/hooks/useUserInfo"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const userInfo = useUserInfo();
  const [mounted, setMounted] = React.useState(false);

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

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <img src="/logo.png" alt="ForensiCare" width={36} height={36} />
                  </div>
                  <div className="grid flex-1 text-left text-2xl leading-tight">
                    <span className="truncate font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">ForensiCare</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {/* Loading state */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
    );
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img src="/logo.png" alt="ForensiCare" width={36} height={36} />
                </div>
                <div className="grid flex-1 text-left text-2xl leading-tight">
                  <span className="truncate font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">ForensiCare</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
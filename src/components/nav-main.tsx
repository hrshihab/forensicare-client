"use client"

import * as React from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}) {
  const pathname = usePathname();
  const [activePath, setActivePath] = React.useState<string | null>(null);
  const [openMenus, setOpenMenus] = React.useState<Set<string>>(new Set());
  
  React.useEffect(() => setActivePath(pathname), [pathname]);
  
  // Keep menus open when they have active items
  React.useEffect(() => {
    const newOpenMenus = new Set<string>();
    items.forEach(item => {
      if (item.items?.some(subItem => activePath === subItem.url) || 
          (activePath && activePath.startsWith(item.url + '/'))) {
        newOpenMenus.add(item.title);
      }
    });
    setOpenMenus(newOpenMenus);
  }, [activePath, items]);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          // Consider the root dashboard (e.g. /dashboard/admin) active only on exact match
          const isRootDashboard = /^\/dashboard\/[^/]+$/.test(item.url);
          const isActive = !!(activePath && (isRootDashboard
            ? activePath === item.url
            : activePath === item.url || activePath.startsWith(item.url + '/')));
          const hasActiveSubItem = !!(activePath && item.items?.some(subItem => activePath === subItem.url));
          
          return (
            <Collapsible key={item.title} asChild open={openMenus.has(item.title)} onOpenChange={(open) => {
              if (open) {
                setOpenMenus(prev => new Set([...prev, item.title]));
              } else {
                setOpenMenus(prev => {
                  const newSet = new Set(prev);
                  newSet.delete(item.title);
                  return newSet;
                });
              }
            }}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const isSubItemActive = !!(activePath && activePath === subItem.url);
                          
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton href={subItem.url} isActive={isSubItemActive} icon={subItem.icon}>
                                {subItem.title}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumb() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    // Generate breadcrumbs based on the current path
    const pathSegments = pathname.split("/").filter(Boolean);
    const items: BreadcrumbItem[] = [
      {
        label: "Home",
        href: "/",
      },
    ];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      // Convert segment to readable format (e.g., "my-page" -> "My Page")
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
      items.push({
        label,
        href: currentPath,
      });
    });

    setBreadcrumbs(items);
  }, [pathname]);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={item.href} className="flex items-center">
            {index === 0 ? (
              <Link
                href={item.href}
                className="flex items-center hover:text-slate-900 dark:hover:text-slate-50"
              >
                <Home className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                {isLast ? (
                  <span className="font-medium text-slate-900 dark:text-slate-50">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-slate-900 dark:hover:text-slate-50"
                  >
                    {item.label}
                  </Link>
                )}
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}

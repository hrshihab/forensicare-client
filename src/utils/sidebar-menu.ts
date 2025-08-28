// src/config/menuItems.tsx
import {
    Users,
    Calendar,
    CalendarDays,
    ClipboardList,
    UserCircle,
    KeyRound,
    BarChart3,
    ArchiveRestore,
    Building,
    Settings,
    Shield,
    FileText,
    Search,
    Activity,
    ClipboardCheck
  } from "lucide-react";
  import { USER_ROLE, UserRole } from "@/constants/roles";
  
  export type MenuItem = {
    title: string;
    url: string;
    icon: any;
    items?: { title: string; url: string; icon?: any }[];
  };
  
  export const getMenuItems = (role: UserRole): MenuItem[] => {
    const baseItems = [
      {
        title: "Dashboard",
        url: `/dashboard/${role}`,
        icon: BarChart3,
        items: [],
      }
    ];

    // Admin-specific menu items
    if (role === USER_ROLE.ADMIN) {
      return [
        ...baseItems,
        {
          title: "User Management",
          url: `/dashboard/${role}/users`,
          icon: Users,
          items: [
            { title: "All Users", url: `/dashboard/${role}/users`, icon: Users },
            { title: "Add User", url: `/dashboard/${role}/users/add`, icon: Users },
          ],
        },
        {
          title: "Department Management",
          url: `/dashboard/${role}/departments`,
          icon: Building,
          items: [
            { title: "All Departments", url: `/dashboard/${role}/departments`, icon: Building },
            { title: "Add Department", url: `/dashboard/${role}/departments/add`, icon: Building },
          ],
        },
        // {
        //   title: "Cases",
        //   url: `/dashboard/${role}/cases`,
        //   icon: FileText,
        //   items: [
        //     { title: "All Cases", url: `/dashboard/${role}/cases` },
        //     { title: "Create Case", url: `/dashboard/${role}/cases/create` },
        //     { title: "Case Reports", url: `/dashboard/${role}/cases/reports` },
        //   ],
        // },
        // {
        //   title: "Evidence",
        //   url: `/dashboard/${role}/evidence`,
        //   icon: Search,
        //   items: [
        //     { title: "All Evidence", url: `/dashboard/${role}/evidence` },
        //     { title: "Add Evidence", url: `/dashboard/${role}/evidence/add` },
        //     { title: "Evidence Analysis", url: `/dashboard/${role}/evidence/analysis` },
        //   ],
        // },
        {
          title: "Investigation Report",
          url: `/dashboard/${role}/investigation-report`,
          icon: ClipboardCheck,
          items: [
            { title: "Create Report", url: `/dashboard/${role}/investigation-report/create`, icon: ClipboardCheck },
            { title: "Create Report (Design 2)", url: `/dashboard/${role}/investigation-report/create-design2`, icon: ClipboardCheck },
            { title: "All Reports", url: `/dashboard/${role}/investigation-report`, icon: ClipboardList },
            { title: "Local (JSON) Reports", url: `/dashboard/${role}/investigation-report/local`, icon: ClipboardList },
            { title: "Report Templates", url: `/dashboard/${role}/investigation-report/templates`, icon: FileText },
          ],
        },
        {
          title: "Medical Exam",
          url: `/dashboard/${role}/medical-exam`,
          icon: ClipboardList,
          items: [
            { title: "Create (Design 2)", url: `/dashboard/${role}/medical-exam/create-design2`, icon: ClipboardList },
          ],
        },
        // {
        //   title: "Reports",
        //   url: `/dashboard/${role}/reports`,
        //   icon: BarChart3,
        //   items: [
        //     { title: "Case Reports", url: `/dashboard/${role}/reports/cases` },
        //     { title: "Evidence Reports", url: `/dashboard/${role}/reports/evidence` },
        //     { title: "User Reports", url: `/dashboard/${role}/reports/users` },
        //     { title: "Analytics", url: `/dashboard/${role}/reports/analytics` },
        //   ],
        // },
        // {
        //   title: "Security",
        //   url: `/dashboard/${role}/security`,
        //   icon: Shield,
        //   items: [
        //     { title: "Access Logs", url: `/dashboard/${role}/security/logs` },
        //     { title: "Permissions", url: `/dashboard/${role}/security/permissions` },
        //     { title: "System Settings", url: `/dashboard/${role}/security/settings` },
        //   ],
        // },
        {
          title: "Profile",
          url: `/dashboard/profile`,
          icon: UserCircle,
          items: [],
        },
      ];
    }

    // User-specific menu items (for USER_ROLE.USER)
    return [
      ...baseItems,
      {
        title: "My Cases",
        url: `/dashboard/${role}/cases`,
        icon: FileText,
        items: [
          { title: "My Cases", url: `/dashboard/${role}/cases`, icon: FileText },
          { title: "Create Case", url: `/dashboard/${role}/cases/create`, icon: FileText },
        ],
       },
      // {
      //   title: "Evidence",
      //   url: `/dashboard/${role}/evidence`,
      //   icon: Search,
      //   items: [
      //     { title: "My Evidence", url: `/dashboard/${role}/evidence` },
      //     { title: "Add Evidence", url: `/dashboard/${role}/evidence/add` },
      //   ],
      // },
      {
        title: "Reports",
        url: `/dashboard/${role}/reports`,
        icon: BarChart3,
        items: [
          { title: "My Reports", url: `/dashboard/${role}/reports`, icon: BarChart3 },
          { title: "Case History", url: `/dashboard/${role}/reports/history`, icon: CalendarDays },
        ],
      },
      {
        title: "Activity",
        url: `/dashboard/${role}/activity`,
        icon: Activity,
        items: [
          { title: "Recent Activity", url: `/dashboard/${role}/activity`, icon: Activity },
          { title: "Notifications", url: `/dashboard/${role}/activity/notifications`, icon: Activity },
        ],
      },
    ];
  };
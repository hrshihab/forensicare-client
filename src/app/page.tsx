"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserInfo from "@/hooks/useUserInfo";
import { isLoggedIn } from "@/services/auth.services";

export default function HomePage() {
  const router = useRouter();
  const userInfo = useUserInfo();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const authStatus = isLoggedIn();
    setIsAuthenticated(authStatus);
    setIsLoading(!userInfo && authStatus);
  }, [userInfo]);

  useEffect(() => {
    if (mounted && !isLoading) {
      // if (isAuthenticated) {
      //   // User is logged in, redirect to dashboard
      //   //router.push("/dashboard/admin");
      // } else {
      //   // User is not logged in, redirect to login
      //  //router.push("/login");
      // }
    }
  }, [isAuthenticated, isLoading, router, mounted]);

  // Always render the same content on server and client initially
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">
          Loading...
        </p>
      </div>
    </div>
  );
}

// components/ClientOnlyWrapper.tsx
"use client";

import dynamic from "next/dynamic";

const UserProfileWrapper = dynamic(() => import("./profile/UserProfileWrapper"), {
  ssr: false,
});

export default function ClientOnlyWrapper() {
  return <UserProfileWrapper />;
}

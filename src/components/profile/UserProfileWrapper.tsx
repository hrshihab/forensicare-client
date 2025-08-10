
"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { useGetEmployeeByUserIdQuery } from "@/redux/api/employeesApi";
import UserProfile from "./UserProfile";

export default function UserProfileWrapper() {
  const userInfo = useUserInfo();
  const { data: employee, isLoading, isError } = useGetEmployeeByUserIdQuery(userInfo?.userId, {
    skip: !userInfo?.userId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load user data</div>;
  const combinedProfile = {
    userName: userInfo?.username,
    email: userInfo?.email,
    role: userInfo?.role,
    employeeName: employee?.EmployeeName,
    phoneNumber: employee?.PhoneNumber,
    department: employee?.Department?.DepartmentName,
    address: employee?.Address,
    dateOfBirth: employee?.DateOfBirth,
    joinDate: employee?.JoinDate,
    image: employee?.PhotoUrl,
  };

  return <UserProfile data={combinedProfile} />;
}

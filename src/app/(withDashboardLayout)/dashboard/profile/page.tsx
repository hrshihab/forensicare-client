"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/services/auth.services";
import { UserProfile } from "@/components/profile/UserProfile";
import { useToast } from "@/components/ui/use-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    console.log('Profile page loaded');
    
    // Load departments
    import('@/data').then((data) => {
      setDepartments(data.departments);
    });

    // Get user info from localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    console.log('Stored userInfo:', storedUserInfo);
    
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        console.log('Parsed userInfo:', parsedUserInfo);
        setUserInfo(parsedUserInfo);
      } catch (error) {
        console.error('Error parsing user info:', error);
        const authUserInfo = getUserInfo();
        if (authUserInfo) {
          setUserInfo({ user: authUserInfo });
        }
      }
    } else {
      const authUserInfo = getUserInfo();
      console.log('Auth userInfo:', authUserInfo);
      if (authUserInfo) {
        setUserInfo({ user: authUserInfo });
      }
    }
    setIsLoadingUser(false);
  }, []);

  const handleSaveProfile = async (updatedData: any) => {
    try {
      // TODO: Implement API call to update user profile
      console.log('Updating profile:', updatedData);
      
      // Update local storage with new data
      if (userInfo) {
        const updatedUserInfo = {
          ...userInfo,
          user: {
            ...userInfo.user,
            ...updatedData
          }
        };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        setUserInfo(updatedUserInfo);
      }
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
    try {
      // TODO: Implement API call to change password
      console.log('Changing password:', { currentPassword, newPassword });
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleAvatarChange = async (file: File) => {
    try {
      // TODO: Implement API call to upload avatar
      console.log('Uploading avatar:', file);
      
      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated successfully.",
      });
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userInfo?.user) {
    console.log('No user info found, showing error page');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">Unable to load your profile information.</p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Transform user data to match the UserProfile component interface
  const profileData = {
    id: userInfo.user.id || userInfo.user.userId,
    firstName: userInfo.user.firstName || userInfo.user.name?.split(' ')[0] || '',
    lastName: userInfo.user.lastName || userInfo.user.name?.split(' ')[1] || '',
    username: userInfo.user.username || userInfo.user.userName || '',
    email: userInfo.user.email || '',
    phone: userInfo.user.phone || userInfo.user.phoneNumber || '',
    departmentName: userInfo.user.departmentName || '',
    jobTitle: userInfo.user.jobTitle || '',
    employeeType: userInfo.user.employeeType || '',
    userStatus: userInfo.user.userStatus || userInfo.user.isActive ? 'Active' : 'Inactive',
    role: userInfo.user.role || '',
    avatar: userInfo.user.avatar || userInfo.user.image || '',
    address: userInfo.user.address || '',
    joinDate: userInfo.user.joinDate || userInfo.user.createdAt || '',
    lastLogin: userInfo.user.lastLogin || new Date().toISOString(),
    isActive: userInfo.user.isActive || true
  };

  console.log('Profile data:', profileData);

  // Transform departments data
  const departmentsList = departments.map(dept => ({
    id: dept.departmentId?.toString() || dept.id?.toString(),
    name: dept.name || dept.departmentName
  }));

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-100 rounded-lg">
        <p className="text-sm text-blue-800">
          Profile page loaded successfully! 
        </p>
      </div>
      <UserProfile
        data={profileData}
        departments={departmentsList}
        onSave={handleSaveProfile}
        onPasswordChange={handlePasswordChange}
        onAvatarChange={handleAvatarChange}
        isEditable={true}
        isLoading={isLoadingUser}
      />
    </div>
  );
} 
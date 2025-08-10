"use client";
import { useEffect, useState } from 'react';
import { getFromLocalStorage } from '@/utils/local-storage';
import { decodedToken } from '@/utils/jwt';
import { authKey } from '@/constants/authkey';
import { JwtPayload } from 'jwt-decode';
import Cookies from 'js-cookie';

interface UserInfo extends JwtPayload {
  aud: string;
  email: string;
  role: string;
  userId: string;
  username: string;
  iss: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  departmentName?: string;
  jobTitle?: string;
  userStatus?: string;
  employeeType?: string;
  lineManager?: string;
  isAgency?: boolean;
}

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = () => {
      // Check both localStorage and cookies for the token
      const authToken = getFromLocalStorage(authKey) || Cookies.get('accessToken');
      
      if (authToken) {
        const decodedData = decodedToken(authToken) as UserInfo;
        if (decodedData) {
          setUserInfo(decodedData);
          return;
        }
      }
      
      // Fallback to localStorage userInfo
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        try {
          const parsed = JSON.parse(userInfo);
          if (parsed.user) {
            // Convert the stored user data to match UserInfo interface
            const convertedUserInfo: UserInfo = {
              ...parsed.user,
              aud: parsed.user.aud || '',
              iss: parsed.user.iss || '',
              exp: parsed.user.exp || 0,
              iat: parsed.user.iat || 0,
              sub: parsed.user.sub || '',
              // Ensure we have the required fields
              username: parsed.user.username || parsed.user.userName || parsed.user.name,
              role: parsed.user.role || parsed.user.departmentName || 'User',
              email: parsed.user.email || '',
              userId: parsed.user.userId || parsed.user.id || '',
            };
            setUserInfo(convertedUserInfo);
            return;
          }
        } catch (error) {
          console.error('Error parsing userInfo:', error);
        }
      }
      
      setUserInfo(null);
    };

    fetchUserInfo();
  }, []);

  return userInfo;
};

export default useUserInfo;
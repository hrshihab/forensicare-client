import { authKey } from '@/constants/authkey';
import { decodedToken } from '@/utils/jwt';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from '@/utils/local-storage';
import Cookies from 'js-cookie';

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    
    if (!accessToken) {
      console.error('No access token provided to storeUserInfo');
      return false;
    }
    
    try {
      setToLocalStorage(authKey, accessToken);
      // Verify the token was stored
      const storedToken = getFromLocalStorage(authKey);
      return storedToken === accessToken;
    } catch (error) {
      console.error('Error storing token:', error);
      return false;
    }
 };

 
 export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey) || Cookies.get('accessToken');
    
    if (authToken) {
       const decodedData = decodedToken(authToken);
       if (decodedData) {
          return {
             ...decodedData
          };
       }
    }
    
    // Fallback to localStorage userInfo
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        return parsed.user;
      } catch (error) {
        console.error('Error parsing userInfo:', error);
      }
    }
    
    return null;
 };

 export const isLoggedIn = () => {
    const authToken =  Cookies.get('accessToken') || getFromLocalStorage(authKey);
    return !!authToken;
 };

 export const removeUser = () => {
    // Remove from localStorage
    removeFromLocalStorage(authKey);
    // Remove from cookies
    Cookies.remove('accessToken', { path: '/' });
    // Remove userInfo
    localStorage.removeItem('userInfo');
 };
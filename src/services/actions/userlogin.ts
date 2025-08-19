"use client";

import { FieldValues } from 'react-hook-form';
import { storeUserInfo } from '../auth.services';
import Cookies from 'js-cookie';

export const userLogin = async (data: FieldValues) => {
  try {
    console.log('Login data:', data);
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api';
    const loginUrl = `${apiUrl}/Account/login`;
    
    console.log('Making request to:', loginUrl);
    
    const res = await fetch(loginUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(data)
    });

    console.log('Response status:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Response error:', errorText);
      throw new Error('Invalid username or password');
    }

    const result = await res.json();
    console.log('API Response:', result);
    
    if (!result.result?.data?.token) {
      console.error('No token in response:', result);
      throw new Error('Invalid response from server');
    }

    const userData = result.result.data;
    const token = userData.token;

    console.log('Token received:', token);
    console.log('User data received:', userData);

    // Store access token
    const storeResult = storeUserInfo({ accessToken: token });
    console.log('Token stored:', storeResult);
    
    // Store token in cookie for backup access
    Cookies.set('accessToken', token, {
      expires: 1, // 1 day
      path: '/',
      sameSite: 'lax'
    });

    // Store user data in localStorage with proper structure
    const userInfoToStore = {
      token: token,
      user: {
        username: userData.username || userData.userName || userData.name,
        name: userData.name || userData.firstName + ' ' + userData.lastName,
        email: userData.email,
        role: userData.role || userData.departmentName || 'User',
        userId: userData.userId || userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        departmentName: userData.departmentName,
        jobTitle: userData.jobTitle,
        userStatus: userData.userStatus || 'Active',
        employeeType: userData.employeeType,
        lineManager: userData.lineManager,
        isAgency: userData.isAgency,
        isSuperUser: userData.isSuperUser ?? userData.IsSuperUser ?? false
      }
    };
    
    console.log('Storing userInfo:', userInfoToStore);
    localStorage.setItem('userInfo', JSON.stringify(userInfoToStore));

    console.log('Redirecting to dashboard...');
    
    // Redirect immediately
    window.location.href = '/dashboard/admin';
    
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

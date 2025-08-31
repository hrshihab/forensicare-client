// API Endpoints Configuration
// This file defines which endpoints use local storage vs remote server

export const API_ENDPOINTS = {
  // SERVER ENDPOINTS (for user management and departments)
  SERVER: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001/api',
    USERS: {
      GET_ALL: '/User/getall',
      GET_BY_ID: '/User',
      GET_USER_INFO: '/User/get/userinfo',
      SAVE_USER_INFO: '/User/save/userinfo',
      RESET_PASSWORD: '/User/resetpassword',
      CREATE_USER: '/user',
    },
    DEPARTMENTS: {
      GET_ALL: '/Department/getall',
      GET_BY_ID: '/department',
    },
  },

  // LOCAL ENDPOINTS (for investigation reports and medical reports)
  LOCAL: {
    REPORTS: {
      BASE: '/api/reports/local',
      GET_ALL: '/api/reports/local',
      GET_BY_ID: (id: string | number) => `/api/reports/local?id=${id}`,
      CREATE_UPDATE: '/api/reports/local',
      SUBMIT: '/api/reports/local',
      UNLOCK: '/api/reports/local',
    },
    MEDICAL_REPORTS: {
      BASE: '/api/medical/local',
      GET_ALL: '/api/medical/local',
      GET_BY_ID: (id: string | number) => `/api/medical/local?id=${id}`,
      CREATE_UPDATE: '/api/medical/local',
    },
  },
};

// Helper function to check if we're using local storage
export const isUsingLocalStorage = (endpointType: 'reports' | 'medical' | 'users' | 'departments') => {
  switch (endpointType) {
    case 'reports':
    case 'medical':
      return true; // These use local storage
    case 'users':
    case 'departments':
      return false; // These use server
    default:
      return false;
  }
};

// Helper function to get the appropriate base URL
export const getBaseUrl = (endpointType: 'reports' | 'medical' | 'users' | 'departments') => {
  if (isUsingLocalStorage(endpointType)) {
    return ''; // Empty string for local Next.js API routes
  }
  return API_ENDPOINTS.SERVER.BASE_URL;
};

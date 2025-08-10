import { User } from "./user";

// Types
export interface LoginRequest {
    name: string;
    password: string;
    rememberMe: boolean;
  }
  
  export interface LoginResponse {
    message: string;
    result: {
      success: boolean;
      data: {
        id: number;
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        jobTitle: string;
        comments: string;
        employmentType: string;
        userStatus: string;
        startDate: string;
        inductionEndDate: string;
        isFireProcedureTrained: boolean;
        isTrainingManager: boolean;
        isTrainer: boolean;
        isFirstAidTrained: boolean;
        userShiftId: number;
        canReceiveVisitor: boolean;
        loginPermission: string;
        lockedDateTime: string;
        token: string;
        isSuperUser: boolean;
        permissions: {
          roleId: number;
          module: string;
          accessLevel: string;
          organizationId: number;
          id: number;
          isNew: boolean;
          isActive: boolean;
          isDeleted: boolean;
          isLocked: boolean;
        }[];
      }
    }
  }
  
  export interface UpdateProfileRequest {
    profileImage?: string;
  }
  
  export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
  }
  
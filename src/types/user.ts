export interface User {
    id: number;
    organizationId: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    departmentName: string;
    jobTitle: string;
    employeeType: string;
    userStatus: string;
    lineManager: string;
    isAgency: boolean;
    profileImage?: string;
}

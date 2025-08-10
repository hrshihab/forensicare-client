"use client"

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGetAllUsersQuery } from "@/redux/api/getApis";
import { getUserInfo } from "@/services/auth.services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Save, 
  User, 
  Mail, 
  Phone, 
  Shield,
  Calendar,
  Building,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useResetPasswordMutation } from '@/redux/api/postApis';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';

export default function EditUser() {
  const router = useRouter();
  const params = useParams();
  const userId = parseInt(params.id as string);
  const { data: users, isLoading, error } = useGetAllUsersQuery({});
  const { toast } = useToast();
  
  const [currentUserInfo, setCurrentUserInfo] = useState<any>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [departments, setDepartments] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);
  const [resetPasswordForm, setResetPasswordForm] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();
  const [formDataLoaded, setFormDataLoaded] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "", 
    userName: "",
    email: "",
    departmentName: "",
    jobTitle: "",
    employeeType: "",
    userStatus: "Active",
    lineManager: "",
    isAgency: false
  });

  useEffect(() => {
    // Load departments
    import('@/data').then((data) => {
      setDepartments(data.departments);
    });

    // Get user info from localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setCurrentUserInfo(parsedUserInfo);
      } catch (error) {
        console.error('Error parsing user info:', error);
        const authUserInfo = getUserInfo();
        if (authUserInfo) {
          setCurrentUserInfo({ user: authUserInfo });
        }
      }
    } else {
      const authUserInfo = getUserInfo();
      if (authUserInfo) {
        setCurrentUserInfo({ user: authUserInfo });
      }
    }
    setIsLoadingUser(false);
  }, []);

  // Load user data when users are loaded
  useEffect(() => {
    if (users && userId && !formDataLoaded) {
      const user = users.find((u: any) => u.id === userId);
      if (user) {
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          userName: user.userName || "",
          email: user.email || "",
          departmentName: user.departmentName || "",
          jobTitle: user.jobTitle || "",
          employeeType: user.employeeType || "",
          userStatus: user.userStatus || "Active",
          lineManager: user.lineManager || "",
          isAgency: user.isAgency ?? false
        });
        setFormDataLoaded(true);
      }
    }
  }, [users, userId, formDataLoaded]);

  // Fallback: Load user data from userInfo query if not found in users list
  useEffect(() => {
    if (currentUserInfo && userId && !formDataLoaded && (!users || !users.find((u: any) => u.id === userId))) {
      if (currentUserInfo) {
        setFormData({
          firstName: currentUserInfo.firstName || "",
          lastName: currentUserInfo.lastName || "",
          userName: currentUserInfo.userName || "",
          email: currentUserInfo.email || "",
          departmentName: currentUserInfo.departmentName || "",
          jobTitle: currentUserInfo.jobTitle || "",
          employeeType: currentUserInfo.employeeType || "",
          userStatus: currentUserInfo.userStatus || "Active",
          lineManager: currentUserInfo.lineManager || "",
          isAgency: currentUserInfo.isAgency ?? false
        });
        setFormDataLoaded(true);
      }
    }
  }, [currentUserInfo, users, userId, formDataLoaded]);

  // Set formDataLoaded to true if we have user data from either source
  useEffect(() => {
    if ((users && users.find((u: any) => u.id === userId)) || currentUserInfo) {
      setFormDataLoaded(true);
    }
  }, [users, currentUserInfo, userId]);

  // Reset form data loaded flag when userId changes
  useEffect(() => {
    setFormDataLoaded(false);
  }, [userId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Implement API call to update user
      console.log('Updating user:', { id: userId, ...formData });
      
      toast({
        title: "User Updated",
        description: "User information has been updated successfully.",
      });
      
      // Navigate back to users list
      router.push('/dashboard/admin/users');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user. Please try again.",
      });
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetPasswordError('');
    if (!resetPasswordForm.newPassword || !resetPasswordForm.confirmPassword) {
      setResetPasswordError('Both fields are required.');
      return;
    }
    if (resetPasswordForm.newPassword !== resetPasswordForm.confirmPassword) {
      setResetPasswordError('Passwords do not match.');
      return;
    }
    try {
      const result: any = await resetPassword({
        id: currentUserInfo.id,
        userName: currentUserInfo.userName,
        newPassword: resetPasswordForm.newPassword,
        confirmPassword: resetPasswordForm.confirmPassword
      });
      if (result?.data?.result?.success) {
        toast({
          title: 'Password Reset',
          description: 'Password has been reset successfully.'
        });
        setResetPasswordModalOpen(false);
        setResetPasswordForm({ newPassword: '', confirmPassword: '' });
      } else {
        setResetPasswordError(result?.data?.result?.message || 'Failed to reset password.');
      }
    } catch (error: any) {
      setResetPasswordError(error?.message || 'Failed to reset password.');
    }
  };

  if (isLoadingUser || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Find current user from either users list or userInfo
  const currentUser = users?.find((u: any) => u.id === userId) || currentUserInfo;

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">User Not Found</h2>
          <p className="text-gray-600 mb-4">The user you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/dashboard/admin/users')}>
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Edit User
          </h1>
          <p className="text-gray-600">
            Update user information and permissions
          </p>
        </div>
        <Button
          className="ml-auto"
          variant="outline"
          onClick={() => setResetPasswordModalOpen(true)}
        >
          Reset Password
        </Button>
      </div>
      {/* Reset Password Modal */}
      <Dialog open={resetPasswordModalOpen} onOpenChange={setResetPasswordModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Password for {currentUser.userName}</DialogTitle>
            <DialogDescription>
              Enter a new password for this user. The password will be immediately updated.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={resetPasswordForm.newPassword}
                onChange={e => setResetPasswordForm(f => ({ ...f, newPassword: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={resetPasswordForm.confirmPassword}
                onChange={e => setResetPasswordForm(f => ({ ...f, confirmPassword: e.target.value }))}
                required
              />
            </div>
            {resetPasswordError && <div className="text-red-600 text-sm">{resetPasswordError}</div>}
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setResetPasswordModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isResetting}>
                {isResetting ? 'Resetting...' : 'Reset Password'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {!formDataLoaded && (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-sm text-gray-600">Loading user data...</span>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      disabled={!formDataLoaded}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                      disabled={!formDataLoaded}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Username</Label>
                    <Input
                      id="userName"
                      value={formData.userName}
                      onChange={(e) => handleInputChange('userName', e.target.value)}
                      required
                      disabled={!formDataLoaded}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      disabled={!formDataLoaded}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      required
                      disabled={!formDataLoaded}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="departmentName">Department</Label>
                    <Input
                      id="departmentName"
                      value={formData.departmentName}
                      onChange={(e) => handleInputChange('departmentName', e.target.value)}
                      required
                      disabled={!formDataLoaded}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeType">Employee Type</Label>
                    <Select 
                      value={formData.employeeType} 
                      onValueChange={(value) => handleInputChange('employeeType', value)}
                      disabled={!formDataLoaded}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Permanent">Permanent</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lineManager">Line Manager</Label>
                    <Input
                      id="lineManager"
                      value={formData.lineManager}
                      onChange={(e) => handleInputChange('lineManager', e.target.value)}
                      disabled={!formDataLoaded}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isAgency"
                    checked={formData.isAgency}
                    onCheckedChange={(checked) => handleInputChange('isAgency', checked)}
                    disabled={!formDataLoaded}
                  />
                  <Label htmlFor="isAgency">Agency Staff</Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex items-center gap-2" disabled={!formDataLoaded}>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={!formDataLoaded}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* User Summary Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                User Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium">
                    {currentUser.firstName} {currentUser.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    @{currentUser.userName}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {currentUser.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-gray-400" />
                  {currentUser.departmentName}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-gray-400" />
                  {currentUser.jobTitle}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Employee Type</span>
                  <Badge variant="secondary">
                    {currentUser.employeeType}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <Badge variant={currentUser.userStatus === 'Active' ? 'default' : 'destructive'}>
                    {currentUser.userStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">View Cases</span>
                <Badge variant="secondary">Allowed</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Edit Cases</span>
                <Badge variant={currentUser.departmentName === 'ADMIN' ? 'default' : 'secondary'}>
                  {currentUser.departmentName === 'ADMIN' ? 'Allowed' : 'Restricted'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Manage Users</span>
                <Badge variant={currentUser.departmentName === 'ADMIN' ? 'default' : 'destructive'}>
                  {currentUser.departmentName === 'ADMIN' ? 'Allowed' : 'Restricted'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">System Settings</span>
                <Badge variant={currentUser.departmentName === 'ADMIN' ? 'default' : 'destructive'}>
                  {currentUser.departmentName === 'ADMIN' ? 'Allowed' : 'Restricted'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 
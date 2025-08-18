"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Mail, 
  Phone, 
  Building,
  MapPin,
  Calendar,
  Edit,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileCardData {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  departmentName?: string;
  jobTitle?: string;
  employeeType?: string;
  userStatus?: string;
  role?: string;
  avatar?: string;
  address?: string;
  joinDate?: string;
  isActive?: boolean;
}

interface ProfileCardProps {
  data: ProfileCardData;
  variant?: 'default' | 'compact' | 'detailed';
  showActions?: boolean;
  onEdit?: (data: ProfileCardData) => void;
  onView?: (data: ProfileCardData) => void;
  onDelete?: (data: ProfileCardData) => void;
  className?: string;
}

export function ProfileCard({ 
  data, 
  variant = 'default',
  showActions = true,
  onEdit,
  onView,
  onDelete,
  className = ""
}: ProfileCardProps) {
  const getInitials = () => {
    return `${data.firstName?.charAt(0) || ''}${data.lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'default';
      case 'manager':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (variant === 'compact') {
    return (
      <Card className={`shadow-sm hover:shadow-md transition-shadow ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={data.avatar} alt={`${data.firstName} ${data.lastName}`} />
              <AvatarFallback className="text-sm font-medium bg-blue-100 text-blue-600">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm truncate">
                  {data.firstName} {data.lastName}
                </h4>
                <Badge variant={getStatusColor(data.userStatus)}>
                  {data.userStatus || 'Active'}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 truncate">@{data.username}</p>
              {data.departmentName && (
                <p className="text-xs text-gray-400 truncate">{data.departmentName}</p>
              )}
            </div>
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onView && (
                    <DropdownMenuItem onClick={() => onView(data)}>
                      View Profile
                    </DropdownMenuItem>
                  )}
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(data)}>
                      Edit Profile
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem 
                      onClick={() => onDelete(data)}
                      className="text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className={`shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30 ${className}`}>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Profile Information
            </div>
            {showActions && (
              <div className="flex items-center gap-2">
                {onEdit && (
                  <Button size="sm" variant="outline" onClick={() => onEdit(data)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {onView && (
                      <DropdownMenuItem onClick={() => onView(data)}>
                        View Full Profile
                      </DropdownMenuItem>
                    )}
                    {onDelete && (
                      <DropdownMenuItem 
                        onClick={() => onDelete(data)}
                        className="text-red-600"
                      >
                        Delete Profile
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
              <AvatarImage src={data.avatar} alt={`${data.firstName} ${data.lastName}`} />
              <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">
                {data.firstName} {data.lastName}
              </h3>
              <p className="text-gray-500">@{data.username}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={getRoleColor(data.role)}>
                  {data.role || 'User'}
                </Badge>
                <Badge variant={getStatusColor(data.userStatus)}>
                  {data.userStatus || 'Active'}
                </Badge>
                {data.employeeType && (
                  <Badge variant="outline">
                    {data.employeeType}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">{data.email}</span>
              </div>
              {data.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{data.phone}</span>
                </div>
              )}
              {data.address && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{data.address}</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              {data.departmentName && (
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{data.departmentName}</span>
                </div>
              )}
              {data.jobTitle && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{data.jobTitle}</span>
                </div>
              )}
              {data.joinDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    Joined {new Date(data.joinDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={`shadow-md hover:shadow-lg transition-shadow ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={data.avatar} alt={`${data.firstName} ${data.lastName}`} />
            <AvatarFallback className="text-sm font-medium bg-blue-100 text-blue-600">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-gray-900 truncate">
                {data.firstName} {data.lastName}
              </h4>
              <Badge variant={getStatusColor(data.userStatus)}>
                {data.userStatus || 'Active'}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 truncate">@{data.username}</p>
            <p className="text-sm text-gray-400 truncate">{data.email}</p>
            {data.departmentName && (
              <p className="text-xs text-gray-400 truncate mt-1">
                {data.departmentName}
              </p>
            )}
          </div>
          {showActions && (
            <div className="flex items-center gap-1">
              {onEdit && (
                <Button size="sm" variant="ghost" onClick={() => onEdit(data)}>
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onView && (
                    <DropdownMenuItem onClick={() => onView(data)}>
                      View Profile
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem 
                      onClick={() => onDelete(data)}
                      className="text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 
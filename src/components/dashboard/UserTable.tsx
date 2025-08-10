"use client"

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Edit, 
  Trash2 
} from "lucide-react";

interface UserTableProps {
  users: any[];
  onEditUser: (userId: number) => void;
  onDeleteUser: (userId: number) => void;
}

export function UserTable({ users, onEditUser, onDeleteUser }: UserTableProps) {
  const getDepartmentName = (departmentName: string) => {
    return departmentName || 'Unknown';
  };

  if (users.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="text-center py-8">
          <div className="flex flex-col items-center gap-2">
            <User className="h-8 w-8 text-gray-400" />
            <p className="text-gray-500">No users found matching your filters</p>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {users.map((user: any) => (
        <TableRow key={user.id}>
          <TableCell>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-sm text-gray-500">
                  @{user.userName}
                </div>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-3 w-3" />
                {user.email}
              </div>
            </div>
          </TableCell>
          <TableCell>
            {getDepartmentName(user.departmentName)}
          </TableCell>
          <TableCell>
            <Badge variant={user.departmentName === 'ADMIN' ? 'default' : 'secondary'}>
              {user.jobTitle || 'N/A'}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant={user.userStatus === 'Active' ? 'default' : 'destructive'}>
              {user.userStatus}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="text-sm text-gray-500">
              {user.employeeType}
            </div>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-end gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onEditUser(user.id)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDeleteUser(user.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
} 
import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

interface UserInfo {
  unique_name?: string;
  Id?: string;
  OrganizationId?: string;
  DepartmentId?: string;
  IsSuperUser?: string;
  IsTrainingManager?: string;
  CanImportStockTake?: string;
  IsTrainer?: string;
  SettingId?: string;
  ShowProcessedRecipeInWeb?: string;
  exp: number; // Token expiration time in seconds since the epoch
}

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/']
const sharedRoutes = ['/dashboard/profile'] // Routes accessible by all authenticated users
 
export function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)
  const isSharedRoute = sharedRoutes.some(route => path.startsWith(route))

  // 3. Get the token from the cookie
  const token = req.cookies.get('accessToken')?.value

  let user: UserInfo | null = null;
  
  if (token) {
    try {
      user = jwtDecode(token) as UserInfo;

      // Check for token expiration
      if (user && user.exp && Date.now() >= user.exp * 1000) {
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.delete('accessToken');
        return response;
      }

      // If user is authenticated and tries to access public routes
      if (isPublicRoute) {
        // Use IsSuperUser to determine if admin
        const role = user.IsSuperUser === 'True' ? 'admin' : 'user';
        const dashboardPath = `/dashboard/${role}`;
        return NextResponse.redirect(new URL(dashboardPath, req.url));
      }

      // Allow access to shared routes (like profile) for all authenticated users
      if (isSharedRoute) {
        return NextResponse.next();
      }

      // If user is authenticated but doesn't have permission for the specific dashboard
      if (path.startsWith('/dashboard/')) {
        const requestedRole = path.split('/')[2]; // Get role from URL
        const userRole = user.IsSuperUser === 'True' ? 'admin' : 'user';
        if (requestedRole && userRole !== requestedRole.toLowerCase()) {
          return NextResponse.redirect(new URL(`/dashboard/${userRole}`, req.url));
        }
      }

    } catch (error) {
      console.error('Token decode error:', error);
      // Clear invalid token
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete('accessToken');
      return response;
    }
  }

  // Redirect to login if trying to access protected route without auth
  if (isProtectedRoute && !user?.Id) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*'
  ]
}
import { NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/app/lib/auth';

// Define your regular handler
async function getDashboardData(req: AuthenticatedRequest) {
  // Access the verified user payload attached by your wrapper
  const email = req.user?.email;

  return NextResponse.json({
    message: 'Access granted to secure data',
    email: email,
  });
}

// Export the wrapped handler
export const GET = withAuth(getDashboardData);

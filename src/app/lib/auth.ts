import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Define the shape of your JWT payload
export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
  };
}

export function withAuth(handler: Function) {
  return async (req: AuthenticatedRequest, ...args: any[]) => {
    try {
      // 1. Extract token from Authorization header or HTTP-only cookies
      const authHeader = req.headers.get('authorization');
      let token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

      if (!token) {
        token = req.cookies.get('token')?.value || null;
      }

      if (!token) {
        return NextResponse.json({ error: 'Authentication token missing' }, { status: 401 });
      }

      // 2. Verify the token signature
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      // 3. Attach payload data directly onto the request object
      req.user = {
        id: payload.sub as string,
        email: payload.email as string,
      };

      // 4. Proceed to the main route handler
      return handler(req, ...args);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
  };
}

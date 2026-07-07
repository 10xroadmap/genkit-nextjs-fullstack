import { db } from '@/db/drizzle';
import { AuthRepo, UserType } from '@/db/repo/auth-repo';
import { z } from 'genkit';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
export const inputSchema = z.object({
    email: z.string(),
    password: z.string()
});
const authRepo = new AuthRepo(db);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = inputSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    message: "Validation failed",
                    errors: validation.error.format() // Formats errors nicely by field name
                },
                { status: 422 }
            );
        }

        const { email, password } = validation.data;
        const existingRecord = await authRepo.findByEmail(email)
        if (!existingRecord) {
            return NextResponse.json(
                {
                    message: "Invalid",
                    errors: [{
                        email: "Invalid email"
                    }]
                },
                { status: 422 }
            );
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = !await bcrypt.compare(hashedPassword, existingRecord.password)
        if (!result) {
            return NextResponse.json(
                {
                    message: "Invalid",
                    errors: [{
                        password: "Invalid password"
                    }]
                },
                { status: 422 }
            );
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const jwt = await new SignJWT({ email, role: 'user' })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('2h') // Token expires in 2 hours
            .sign(secret);

        // 4. Send JWT in the JSON response body
        return NextResponse.json({
            success: true,
            token: jwt
        });
    } catch (error) {
        // Handle unexpected syntax errors (e.g., malformed JSON payloads)
        return NextResponse.json(
            { message: "Invalid JSON or server error :" + error },
            { status: 500 }
        );
    }
}

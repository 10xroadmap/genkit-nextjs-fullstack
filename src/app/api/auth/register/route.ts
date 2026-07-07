import { db } from '@/db/drizzle';
import { AuthRepo, UserType } from '@/db/repo/auth-repo';
import { z } from 'genkit';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
export const inputSchema = z.object({
    name: z.string(),
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

        const { name, email, password } = validation.data;
        const existingRecord = await authRepo.findByEmail(email)
        if (existingRecord) {
            return NextResponse.json(
                {
                    message: "Validation failed",
                    errors: [{
                        email: "Email already exist"
                    }]
                },
                { status: 422 }
            );
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await authRepo.create({
            email: email,
            password: hashedPassword,
            name: name
        })
        delete (newUser as Partial<UserType>).password;
        return NextResponse.json(
            {
                message: "Success",
                data: newUser
            },
            { status: 201 }
        );

    } catch (error) {
        // Handle unexpected syntax errors (e.g., malformed JSON payloads)
        return NextResponse.json(
            { message: "Invalid JSON or server error :" + error },
            { status: 500 }
        );
    }
}

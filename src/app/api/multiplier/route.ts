import { z } from 'genkit';
import { NextRequest, NextResponse } from 'next/server';
export const inputSchema = z.object({
    n1: z.number().int("First Number"),
    n2: z.number().int("Second Number")
});
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

        const { n1, n2 } = validation.data;
        const result = n1 * n2
       
        return NextResponse.json(
            { result: result },
            { status: 200 }
        );

    } catch (error) {
        // Handle unexpected syntax errors (e.g., malformed JSON payloads)
        return NextResponse.json(
            { message: "Invalid JSON or server error" },
            { status: 500 }
        );
    }
}

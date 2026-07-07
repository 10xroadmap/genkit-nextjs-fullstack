import { db } from '@/db/drizzle';
import { OrderStatusRepository } from '@/db/repo/order-status-repo';
import { queryIntentFlow } from '@/genkit/query-intent-flow';
import { z } from 'genkit';
import { NextRequest, NextResponse } from 'next/server';
const orderStatusRepository = new OrderStatusRepository(db);

export const inputSchema = z.object({
    query: z.string()
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

        const { query } = validation.data;
        const { intent } = await queryIntentFlow({ query: query });

        const pieces: string[] = intent.split("|");
        if (pieces && pieces.length >= 2 && pieces[0] == 'order-status') {
            const order_id = pieces[1]
            const orderStatus = await orderStatusRepository.findById(parseInt(order_id))
            return NextResponse.json(
                {
                    message: 'Done',
                    intent: pieces[0],
                    orderStatus: orderStatus
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    message: 'WIP',
                    intent: intent
                },
                { status: 200 }
            );
        }

    } catch (error) {
        // Handle unexpected syntax errors (e.g., malformed JSON payloads)
        return NextResponse.json(
            { message: "Invalid JSON or server error" + JSON.stringify(error) },
            { status: 500 }
        );
    }
}

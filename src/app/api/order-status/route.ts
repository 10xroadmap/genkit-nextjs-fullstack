import { db } from '@/db/drizzle';
import { OrderStatusRepository } from '@/db/repo/order-status-repo';

import { NextRequest, NextResponse } from 'next/server';

const userRepository = new OrderStatusRepository(db);
export async function GET(request: NextRequest) {
    try {

        const rows = await userRepository.findAll()
        return NextResponse.json(
            { result: rows },
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

import { db } from '@/db/drizzle';
import { OrderStatusRepository } from '@/db/repo/order-status-repo';
import { NextRequest, NextResponse } from 'next/server';
interface RouteParams {
    params: Promise<{ id: string }>;
}
const userRepository = new OrderStatusRepository(db);
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        const row = await userRepository.findById(parseInt(id) || 0)
        return NextResponse.json(
            { result: row },
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

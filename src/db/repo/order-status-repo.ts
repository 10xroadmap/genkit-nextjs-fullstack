import { eq } from 'drizzle-orm';
import { DBType } from '@/db/drizzle';
import { db } from '@/db/drizzle';

import { order_status } from '@/db/schema';

// 1. Define the OrderStatus type inferred from the Drizzle schema
export type OrderStatusType = typeof order_status.$inferSelect;

export class OrderStatusRepository {
    constructor(private client: DBType) { }

    async findById(id: number): Promise<OrderStatusType | null> {
        const result = await this.client
            .select()
            .from(order_status)
            .where(eq(order_status.id, id))
            .limit(1);

        return result[0] || null;
    }
    async findAll(): Promise<OrderStatusType[] | null> {
        const result = await this.client
            .select()
            .from(order_status)

        return result || null;
    }

    async create(orderstatus: OrderStatusType): Promise<OrderStatusType> {
        const [inserted] = await this.client
            .insert(order_status)
            .values(orderstatus)
            .returning();

        return inserted;
    }


}
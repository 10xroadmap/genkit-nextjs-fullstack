import { eq } from 'drizzle-orm';
import { DBType } from '@/db/drizzle';
import { users } from '@/db/schema';
import { CreateUserDto } from '@/app/dto/user-create-dto';

// 1. Define the OrderStatus type inferred from the Drizzle schema
export type UserType = typeof users.$inferSelect;

export class AuthRepo {
    constructor(private client: DBType) { }

    async findByEmail(email: string): Promise<UserType | null> {
        const result = await this.client
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        return result[0] || null;
    }
   

    async create(dto: CreateUserDto): Promise<UserType> {
        const [inserted] = await this.client
            .insert(users)
            .values(dto)
            .returning();

        return inserted;
    }


}
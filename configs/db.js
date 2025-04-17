import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING);
export const db = drizzle(sql);

// Add a test query to verify connection
export async function testConnection() {
    try {
        const result = await db.select().from(STUDY_TYPE_CONTENT_TABLE).limit(1);
        console.log('Database connection successful:', result);
        return true;
    } catch (error) {
        console.error('Database connection failed:', error);
        return false;
    }
}

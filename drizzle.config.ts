import { defineConfig } from 'drizzle-kit'
import type { Config } from 'drizzle-kit'
const dbUrl = process.env.DATABASE_URL
if (!dbUrl) throw new Error('DATABASE URL is REQUIRED')

export default defineConfig({
    dialect: 'postgresql',
    schema: './shared/schema',
    out: './supabase/drizzle',
    dbCredentials: {
        url: dbUrl,
        ssl: { 
            rejectUnauthorized: false
        }
    }
}) satisfies Config
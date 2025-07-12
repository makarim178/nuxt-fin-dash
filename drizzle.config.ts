import { defineConfig, type Config } from 'drizzle-kit'
// const config = useRuntimeConfig()
// export default defineConfig({
//     schema: './db/schema',
//     dialect: 'sqlite',
//     out: './drizzle',
//     dbCredentials: {
//         url: './sqlite.db'
//     }
// }) 

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required')
export default defineConfig({
    dialect: 'postgresql',
    schema: './db/supabase/schema',
    out: './db/supabase/drizzle',
    dbCredentials: {
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    }
}) satisfies Config
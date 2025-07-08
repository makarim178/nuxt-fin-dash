import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './db/schema',
    dialect: 'sqlite',
    out: './drizzle',
    dbCredentials: {
        url: './sqlite.db'
    }
}) 
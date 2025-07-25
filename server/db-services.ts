import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '#shared/schema'

const config = useRuntimeConfig()
const client = postgres(config.public.dbUrl, { prepare: false })

export const db = drizzle({ client, schema })
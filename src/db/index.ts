import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import * as schema from './schema';

// Ensure data directory exists
const dataDir = join(process.cwd(), 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const sqlite = new Database(join(dataDir, 'pixiole.db'));
export const db = drizzle(sqlite, { schema });

// Run migrations on startup
migrate(db, { migrationsFolder: './drizzle' });

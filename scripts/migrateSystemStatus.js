#!/usr/bin/env node
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.SUPABASE_DB_URL;
if (!connectionString) {
  console.error('Missing SUPABASE_DB_URL in environment');
  process.exit(1);
}

const client = new Client({ connectionString });
(async () => {
  try {
    await client.connect();
    const sqlPath = path.join(process.cwd(), 'migrations', '002_create_system_status_table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');
    await client.query(sql);
    console.log('Migration applied successfully.');
  } catch (err) {
    console.error('Error applying migration:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
})();
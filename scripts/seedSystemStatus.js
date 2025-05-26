#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in environment');
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  try {
    const mdPath = path.join(process.cwd(), 'public', 'SYSTEM_STATUS.md');
    const content = fs.readFileSync(mdPath, 'utf-8');
    // Upsert a single system_status record with id=1
    const { data, error } = await supabase
      .from('system_status')
      .upsert({ id: 1, content });
    if (error) {
      console.error('Error seeding system_status table:', error);
      process.exit(1);
    }
    console.log('Seeded system_status table successfully.');
  } catch (err) {
    console.error('Unexpected error during seeding:', err);
    process.exit(1);
  }
})();

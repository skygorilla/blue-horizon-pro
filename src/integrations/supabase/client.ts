
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://cxdknqvqipgxehlozzpi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZGtucXZxaXBneGVobG96enBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDg2MzcsImV4cCI6MjA1OTg4NDYzN30.CuXP_aQKZIiBgE9x7pk1ZExJP7Ic4SX6dCMGXA2OP7M";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

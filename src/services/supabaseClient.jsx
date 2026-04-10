import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Export Supabase Client
export const supabase = createClient(supabaseUrl, supabaseKey);
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wkgnowfheylpaoahsjap.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZ25vd2ZoZXlscGFvYWhzamFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4MzYwMTUsImV4cCI6MjA3MjQxMjAxNX0.f4rFLwNWP9H_ZbPz7QQ-v0weE6aj5pc_jaoo5FkXtFE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

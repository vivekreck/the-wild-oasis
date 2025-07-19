
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://ljjqzgubkiuqmwwcnpnv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqanF6Z3Via2l1cW13d2NucG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjE0MjQsImV4cCI6MjA2Nzg5NzQyNH0.86poS8cGYAoiLEeMVMKsV5q1zIWBWtll5pA3juXfuPc";

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

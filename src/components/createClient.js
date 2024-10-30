import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dzztvvyzqiuksuyyrfzy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6enR2dnl6cWl1a3N1eXlyZnp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2MzMxMzcsImV4cCI6MjA0MzIwOTEzN30.Y77DWzAIwnLQC-GfqfwNAu83v37cikLmRH_x8NGdmJk'

export const supabase = createClient(supabaseUrl, supabaseKey)


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oedfbwwhfjlulvgjydfk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lZGZid3doZmpsdWx2Z2p5ZGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1OTI5NjgsImV4cCI6MjAyNzE2ODk2OH0.54Lmj2KjDkHTD7Oa1z3qaaPs7dB8ViGXdPK1RL1HOs4'
export const Supabase = createClient(supabaseUrl, supabaseKey)
import { createClient } from "@supabase/supabase-js";

export default function getSupabase() {
  // Supabase configuration
  const supabaseUrl = "https://guouajygwrnsvpqvrgkz.supabase.co";
  const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1b3Vhanlnd3Juc3ZwcXZyZ2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzMzI5MTYsImV4cCI6MjA1ODkwODkxNn0.1x2Z6DhobqooWVGOByCtWypMajtExEU3dyD5wChrSE8";
  return createClient(supabaseUrl, supabaseAnonKey);
}

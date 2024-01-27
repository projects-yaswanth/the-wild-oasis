import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pmqfugzxfqqdpfndhtut.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtcWZ1Z3p4ZnFxZHBmbmRodHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxNDk3MzYsImV4cCI6MjAyMTcyNTczNn0.eoO2GHU4WpCu83PB25bUkr96BQCYjVgENptSLTHE4Fw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

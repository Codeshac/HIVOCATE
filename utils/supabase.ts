// utils/supabase.ts
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Use your actual Supabase credentials directly (temporarily for testing)
const supabaseUrl = 'https://deaukpreuzsxknwdmjqn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlYXVrcHJldXpzeGtud2RtanFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjA4MzgsImV4cCI6MjA3NDUzNjgzOH0.h3zgbcpZw9iMfhDHYjuGXTXy3wS1jmWnz9rmzODxhQE';

// Simple validation
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project')) {
  console.error('❌ Missing or invalid Supabase credentials');
  console.log('Please update utils/supabase.ts with your actual Supabase URL and anon key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient('https://gnikeudsgtmpxxyhihpy.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaWtldWRzZ3RtcHh4eWhpaHB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU2NjU3MDUsImV4cCI6MTk2MTI0MTcwNX0.JjLAGReCZJQXzkLv-EttP5Q4Gw8BbtQWS1dimcGrjfU')

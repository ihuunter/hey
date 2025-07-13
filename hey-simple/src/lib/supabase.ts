import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Post {
  id: string
  content: string
  author_id: string
  author_name: string
  author_username: string
  author_avatar?: string
  created_at: string
  likes_count: number
  comments_count: number
  shares_count: number
  is_liked: boolean
}

export interface User {
  id: string
  username: string
  name: string
  bio?: string
  avatar?: string
  followers_count: number
  following_count: number
  posts_count: number
  created_at: string
}

export interface Comment {
  id: string
  content: string
  post_id: string
  author_id: string
  author_name: string
  author_username: string
  author_avatar?: string
  created_at: string
  likes_count: number
}
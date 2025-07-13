import React, { useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import PostCard from '../Post/PostCard'
import CreatePost from './CreatePost'
import { supabase, type Post } from '../../lib/supabase'
import { useAppStore } from '../../store/useAppStore'

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const { setLoading } = useAppStore()

  // Mock data for now
  const mockPosts: Post[] = [
    {
      id: '1',
      content: 'مرحباً بكم في موقع Hey الجديد! 🚀\n\nهذا مثال على منشور في الشبكة الاجتماعية الجديدة المبنية على React و Supabase.',
      author_id: '1',
      author_name: 'أحمد محمد',
      author_username: 'ahmed_dev',
      author_avatar: '',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      likes_count: 15,
      comments_count: 3,
      shares_count: 2,
      is_liked: false,
    },
    {
      id: '2',
      content: 'أعمل على مشروع جديد باستخدام React و TypeScript 💻\n\nالتطوير أصبح أسهل مع الأدوات الحديثة!',
      author_id: '2',
      author_name: 'فاطمة علي',
      author_username: 'fatima_codes',
      author_avatar: '',
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      likes_count: 8,
      comments_count: 1,
      shares_count: 0,
      is_liked: true,
    },
    {
      id: '3',
      content: 'تعلمت اليوم شيئاً جديداً عن CSS Grid! 🎨\n\nمن أفضل ميزات CSS الحديثة للتخطيط.',
      author_id: '3',
      author_name: 'محمد سعد',
      author_username: 'mohammed_design',
      author_avatar: '',
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      likes_count: 12,
      comments_count: 5,
      shares_count: 3,
      is_liked: false,
    },
  ]

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    setIsLoading(true)
    setLoading(true)
    
    try {
      // For now, use mock data
      // In the future, fetch from Supabase:
      // const { data, error } = await supabase
      //   .from('posts')
      //   .select('*')
      //   .order('created_at', { ascending: false })
      
      setTimeout(() => {
        setPosts(mockPosts)
        setIsLoading(false)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error loading posts:', error)
      setIsLoading(false)
      setLoading(false)
    }
  }

  const handleLike = async (postId: string) => {
    // Update UI optimistically
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              is_liked: !post.is_liked,
              likes_count: post.is_liked ? post.likes_count - 1 : post.likes_count + 1
            }
          : post
      )
    )

    // TODO: Send to Supabase
    // const { error } = await supabase
    //   .from('likes')
    //   .upsert({ post_id: postId, user_id: currentUser.id })
  }

  const handleComment = (postId: string) => {
    // TODO: Open comment modal or navigate to post detail
    console.log('Comment on post:', postId)
  }

  const handleShare = (postId: string) => {
    // TODO: Implement share functionality
    console.log('Share post:', postId)
  }

  const handleBookmark = (postId: string) => {
    // TODO: Implement bookmark functionality
    console.log('Bookmark post:', postId)
  }

  const handlePostCreated = (newPost: Omit<Post, 'id' | 'created_at' | 'likes_count' | 'comments_count' | 'shares_count' | 'is_liked'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(), // Temporary ID
      created_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      shares_count: 0,
      is_liked: false,
    }
    
    setPosts(currentPosts => [post, ...currentPosts])
    setShowCreatePost(false)
  }

  return (
    <div className="py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          الرئيسية
        </h1>
        <button
          onClick={() => setShowCreatePost(true)}
          className="flex items-center space-x-2 space-x-reverse bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>منشور جديد</span>
        </button>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
        />
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="animate-pulse">
                <div className="flex space-x-3 space-x-reverse">
                  <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-12 w-12"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Posts */}
      {!isLoading && (
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                لا توجد منشورات بعد
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                onBookmark={handleBookmark}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Home
import React, { useState, useEffect } from 'react'
import PostCard from '../Post/PostCard'
import NewPost from './NewPost'
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
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
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
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
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
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      likes_count: 12,
      comments_count: 5,
      shares_count: 3,
      is_liked: false,
    },
    {
      id: '4',
      content: 'شاركت اليوم في هاكاثون رائع! 🏆\n\nفزنا بالمركز الأول في فئة أفضل تطبيق ويب. الفريق كان مذهلاً والتجربة لا تُنسى.',
      author_id: '4',
      author_name: 'سارة أحمد',
      author_username: 'sara_winner',
      author_avatar: '',
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      likes_count: 24,
      comments_count: 8,
      shares_count: 5,
      is_liked: true,
    },
    {
      id: '5',
      content: 'نصائح للمطورين الجدد:\n\n1. اقرأ الكود أكثر مما تكتب\n2. لا تخف من طلب المساعدة\n3. تعلم من أخطائك\n4. اكتب كود نظيف ومفهوم\n\n#نصائح_البرمجة',
      author_id: '5',
      author_name: 'عمر الخبير',
      author_username: 'omar_expert',
      author_avatar: '',
      created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      likes_count: 45,
      comments_count: 12,
      shares_count: 18,
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
  }

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId)
  }

  const handleShare = (postId: string) => {
    console.log('Share post:', postId)
  }

  const handleRepost = (postId: string) => {
    console.log('Repost:', postId)
  }

  const handlePostCreated = (newPost: Omit<Post, 'id' | 'created_at' | 'likes_count' | 'comments_count' | 'shares_count' | 'is_liked'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white bg-opacity-80 dark:bg-black dark:bg-opacity-80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            الرئيسية
          </h1>
        </div>
      </div>

      {/* New Post */}
      <NewPost onOpenComposer={() => setShowCreatePost(true)} />

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
        />
      )}

      {/* Loading state */}
      {isLoading && (
        <div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
              <div className="animate-pulse">
                <div className="flex space-x-3 space-x-reverse">
                  <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-12 w-12"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Posts */}
      {!isLoading && (
        <div>
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
                onRepost={handleRepost}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Home
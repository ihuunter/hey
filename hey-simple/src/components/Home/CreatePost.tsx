import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { Post } from '../../lib/supabase'
import { useAppStore } from '../../store/useAppStore'

interface CreatePostProps {
  onClose: () => void
  onPostCreated: (post: Omit<Post, 'id' | 'created_at' | 'likes_count' | 'comments_count' | 'shares_count' | 'is_liked'>) => void
}

const CreatePost: React.FC<CreatePostProps> = ({ onClose, onPostCreated }) => {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { currentUser } = useAppStore()

  // Mock user data if no user is logged in
  const user = currentUser || {
    id: 'temp-user',
    username: 'user_demo',
    name: 'مستخدم تجريبي',
    avatar: '',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) return

    setIsSubmitting(true)

    try {
      const newPost = {
        content: content.trim(),
        author_id: user.id,
        author_name: user.name,
        author_username: user.username,
        author_avatar: user.avatar,
      }

      // TODO: Save to Supabase
      // const { data, error } = await supabase
      //   .from('posts')
      //   .insert([newPost])
      //   .select()

      onPostCreated(newPost)
      setContent('')
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            إنشاء منشور جديد
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          {/* User info */}
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <img
              className="h-10 w-10 rounded-full"
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=fb3a5d&color=fff`}
              alt={user.name}
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @{user.username}
              </p>
            </div>
          </div>

          {/* Content textarea */}
          <div className="mb-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="ما الذي يحدث؟"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              maxLength={280}
            />
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {content.length}/280
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting}
              className="px-6 py-2 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {isSubmitting ? 'جاري النشر...' : 'نشر'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
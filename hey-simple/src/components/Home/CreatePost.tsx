import React, { useState } from 'react'
import { XMarkIcon, PhotoIcon, FaceSmileIcon, MapPinIcon } from '@heroicons/react/24/outline'
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

      onPostCreated(newPost)
      setContent('')
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const maxLength = 280
  const remaining = maxLength - content.length

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 pt-12">
      <div className="bg-white dark:bg-black rounded-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            إنشاء منشور
          </h2>
          <div className="w-9"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            {/* User info */}
            <div className="flex items-start space-x-3 space-x-reverse">
              <img
                className="h-12 w-12 rounded-full"
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=fb3a5d&color=fff`}
                alt={user.name}
              />
              <div className="flex-1">
                {/* Content textarea */}
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="ما الذي يحدث؟!"
                  rows={6}
                  className="w-full text-xl placeholder-gray-500 dark:placeholder-gray-400 bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 dark:text-white resize-none"
                  maxLength={maxLength}
                  autoFocus
                />
              </div>
            </div>

            {/* Media options */}
            <div className="mt-4 mr-15">
              <div className="flex items-center space-x-4 space-x-reverse text-brand-500">
                <button
                  type="button"
                  className="p-2 hover:bg-brand-50 dark:hover:bg-brand-900 dark:hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <PhotoIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-brand-50 dark:hover:bg-brand-900 dark:hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <FaceSmileIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-brand-50 dark:hover:bg-brand-900 dark:hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <MapPinIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 space-x-reverse">
              {/* Character count */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className={`text-sm ${remaining < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                  {remaining < 20 && remaining}
                </div>
                <div className="relative w-8 h-8">
                  <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray={`${88 * (content.length / maxLength)} 88`}
                      className={remaining < 20 ? 'text-red-500' : 'text-brand-500'}
                    />
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!content.trim() || isSubmitting || content.length > maxLength}
              className="bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-2 rounded-full transition-colors"
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
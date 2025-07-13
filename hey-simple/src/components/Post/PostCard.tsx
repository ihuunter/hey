import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ar } from 'date-fns/locale'
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartIconSolid,
} from '@heroicons/react/24/solid'
import type { Post } from '../../lib/supabase'

interface PostCardProps {
  post: Post
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
  onShare?: (postId: string) => void
  onRepost?: (postId: string) => void
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  onRepost,
}) => {
  const timeAgo = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
    locale: ar,
  })

  return (
    <article className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 hover:bg-opacity-50 dark:hover:bg-gray-900 dark:hover:bg-opacity-50 transition-colors cursor-pointer">
      <div className="px-4 py-3">
        <div className="flex items-start space-x-3 space-x-reverse">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              className="w-12 h-12 rounded-full"
              src={post.author_avatar || `https://ui-avatars.com/api/?name=${post.author_name}&background=fb3a5d&color=fff`}
              alt={post.author_name}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <h3 className="font-bold text-gray-900 dark:text-white hover:underline">
                  {post.author_name}
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  @{post.author_username}
                </span>
                <span className="text-gray-500 dark:text-gray-400">•</span>
                <time className="text-gray-500 dark:text-gray-400">
                  {timeAgo}
                </time>
              </div>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <EllipsisHorizontalIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="mt-2">
              <div className="text-gray-900 dark:text-white text-[15px] leading-normal whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-3 max-w-md">
              {/* Reply */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onComment?.(post.id)
                }}
                className="flex items-center space-x-2 space-x-reverse text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 group"
              >
                <div className="p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:bg-opacity-20 transition-colors">
                  <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                </div>
                <span className="text-sm">{post.comments_count}</span>
              </button>

              {/* Repost */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRepost?.(post.id)
                }}
                className="flex items-center space-x-2 space-x-reverse text-gray-500 hover:text-green-600 dark:hover:text-green-400 group"
              >
                <div className="p-2 rounded-full group-hover:bg-green-100 dark:group-hover:bg-green-900 group-hover:bg-opacity-20 transition-colors">
                  <ArrowPathRoundedSquareIcon className="w-5 h-5" />
                </div>
                <span className="text-sm">{post.shares_count}</span>
              </button>

              {/* Like */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onLike?.(post.id)
                }}
                className={`flex items-center space-x-2 space-x-reverse group ${
                  post.is_liked 
                    ? 'text-red-600 dark:text-red-500' 
                    : 'text-gray-500 hover:text-red-600 dark:hover:text-red-400'
                }`}
              >
                <div className="p-2 rounded-full group-hover:bg-red-100 dark:group-hover:bg-red-900 group-hover:bg-opacity-20 transition-colors">
                  {post.is_liked ? (
                    <HeartIconSolid className="w-5 h-5" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-sm">{post.likes_count}</span>
              </button>

              {/* Share */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onShare?.(post.id)
                }}
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 group"
              >
                <div className="p-2 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:bg-opacity-20 transition-colors">
                  <ShareIcon className="w-5 h-5" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard
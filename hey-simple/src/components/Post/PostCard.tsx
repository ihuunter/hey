import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ar } from 'date-fns/locale'
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ArrowPathRoundedSquareIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from '@heroicons/react/24/solid'
import type { Post } from '../../lib/supabase'

interface PostCardProps {
  post: Post
  onLike?: (postId: string) => void
  onComment?: (postId: string) => void
  onShare?: (postId: string) => void
  onBookmark?: (postId: string) => void
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  onBookmark,
}) => {
  const timeAgo = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
    locale: ar,
  })

  return (
    <article className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
      {/* Post header */}
      <div className="flex items-start space-x-3 space-x-reverse">
        <div className="flex-shrink-0">
          <img
            className="h-12 w-12 rounded-full"
            src={post.author_avatar || `https://ui-avatars.com/api/?name=${post.author_name}&background=fb3a5d&color=fff`}
            alt={post.author_name}
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2 space-x-reverse">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {post.author_name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              @{post.author_username}
            </p>
            <span className="text-gray-500 dark:text-gray-400">•</span>
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {timeAgo}
            </time>
          </div>
        </div>
      </div>

      {/* Post content */}
      <div className="mt-3">
        <div className="text-gray-900 dark:text-white leading-relaxed linkify markup">
          {post.content.split('\n').map((line, index) => (
            <p key={index} className={index > 0 ? 'mt-2' : ''}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Post actions */}
      <div className="mt-4 flex items-center justify-between max-w-md">
        {/* Like */}
        <button
          onClick={() => onLike?.(post.id)}
          className="flex items-center space-x-2 space-x-reverse text-gray-500 hover:text-red-500 transition-colors group"
        >
          {post.is_liked ? (
            <HeartIconSolid className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 group-hover:text-red-500" />
          )}
          <span className="text-sm">{post.likes_count}</span>
        </button>

        {/* Comment */}
        <button
          onClick={() => onComment?.(post.id)}
          className="flex items-center space-x-2 space-x-reverse text-gray-500 hover:text-blue-500 transition-colors group"
        >
          <ChatBubbleOvalLeftIcon className="h-5 w-5 group-hover:text-blue-500" />
          <span className="text-sm">{post.comments_count}</span>
        </button>

        {/* Share */}
        <button
          onClick={() => onShare?.(post.id)}
          className="flex items-center space-x-2 space-x-reverse text-gray-500 hover:text-green-500 transition-colors group"
        >
          <ArrowPathRoundedSquareIcon className="h-5 w-5 group-hover:text-green-500" />
          <span className="text-sm">{post.shares_count}</span>
        </button>

        {/* Bookmark */}
        <button
          onClick={() => onBookmark?.(post.id)}
          className="text-gray-500 hover:text-yellow-500 transition-colors"
        >
          <BookmarkIcon className="h-5 w-5" />
        </button>
      </div>
    </article>
  )
}

export default PostCard
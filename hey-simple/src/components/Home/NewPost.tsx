import React from 'react'
import { useAppStore } from '../../store/useAppStore'

interface NewPostProps {
  onOpenComposer: () => void
}

const NewPost: React.FC<NewPostProps> = ({ onOpenComposer }) => {
  const { currentUser } = useAppStore()

  // Mock user data if no user is logged in
  const user = currentUser || {
    id: 'temp-user',
    username: 'user_demo',
    name: 'مستخدم تجريبي',
    avatar: '',
  }

  return (
    <div
      className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 cursor-pointer hover:bg-gray-50 hover:bg-opacity-50 dark:hover:bg-gray-900 dark:hover:bg-opacity-50 transition-colors"
      onClick={onOpenComposer}
    >
      <div className="flex items-center space-x-3 space-x-reverse">
        <img
          alt={user.name}
          className="w-12 h-12 rounded-full border border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-700"
          src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=fb3a5d&color=fff`}
        />
        <div className="flex-1">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl px-4 py-3 text-gray-500 dark:text-gray-400 text-xl">
            ما الذي يحدث؟!
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPost
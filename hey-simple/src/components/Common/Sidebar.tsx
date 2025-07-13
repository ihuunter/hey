import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  BookmarkIcon,
  UserIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  BellIcon as BellIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid'
import { useAppStore } from '../../store/useAppStore'

const Sidebar: React.FC = () => {
  const location = useLocation()
  const { isDarkMode, toggleDarkMode, currentUser } = useAppStore()

  const navigation = [
    {
      name: 'الرئيسية',
      href: '/',
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
      current: location.pathname === '/',
    },
    {
      name: 'استكشاف',
      href: '/explore',
      icon: MagnifyingGlassIcon,
      iconSolid: MagnifyingGlassIconSolid,
      current: location.pathname === '/explore',
    },
    {
      name: 'الإشعارات',
      href: '/notifications',
      icon: BellIcon,
      iconSolid: BellIconSolid,
      current: location.pathname === '/notifications',
    },
    {
      name: 'المحفوظات',
      href: '/bookmarks',
      icon: BookmarkIcon,
      iconSolid: BookmarkIconSolid,
      current: location.pathname === '/bookmarks',
    },
    {
      name: 'الملف الشخصي',
      href: `/profile/${currentUser?.username || 'me'}`,
      icon: UserIcon,
      iconSolid: UserIconSolid,
      current: location.pathname.includes('/profile'),
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center px-6 py-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-brand-500">Hey</h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.current ? item.iconSolid : item.icon
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-3 text-base font-medium rounded-lg transition-colors
                    ${item.current
                      ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <Icon
                    className={`
                      ml-3 h-6 w-6 flex-shrink-0
                      ${item.current
                        ? 'text-brand-500'
                        : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300'
                      }
                    `}
                  />
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        >
          {isDarkMode ? (
            <SunIcon className="ml-3 h-6 w-6 flex-shrink-0 text-gray-500" />
          ) : (
            <MoonIcon className="ml-3 h-6 w-6 flex-shrink-0 text-gray-500" />
          )}
          {isDarkMode ? 'الوضع الفاتح' : 'الوضع المظلم'}
        </button>

        {/* Settings */}
        <Link
          to="/settings"
          className="w-full flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        >
          <Cog6ToothIcon className="ml-3 h-6 w-6 flex-shrink-0 text-gray-500" />
          الإعدادات
        </Link>

        {/* User profile */}
        {currentUser && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.name}&background=fb3a5d&color=fff`}
                  alt={currentUser.name}
                />
              </div>
              <div className="mr-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {currentUser.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  @{currentUser.username}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
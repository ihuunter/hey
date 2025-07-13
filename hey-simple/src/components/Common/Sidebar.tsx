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
  PlusIcon,
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
    <div className="flex flex-col h-full p-4">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/" className="block">
          <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.current ? item.iconSolid : item.icon
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-3 text-xl rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-900
                    ${item.current
                      ? 'font-bold text-gray-900 dark:text-white'
                      : 'font-normal text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <Icon className="ml-4 h-7 w-7" />
                  <span className="hidden xl:block">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Tweet Button */}
        <div className="mt-8">
          <button className="w-full xl:w-auto bg-brand-500 hover:bg-brand-600 text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center justify-center">
            <PlusIcon className="h-6 w-6 xl:hidden" />
            <span className="hidden xl:block">نشر</span>
          </button>
        </div>
      </nav>

      {/* Bottom section */}
      <div className="space-y-2">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center px-3 py-3 text-xl rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900 transition-colors"
        >
          {isDarkMode ? (
            <SunIcon className="ml-4 h-7 w-7" />
          ) : (
            <MoonIcon className="ml-4 h-7 w-7" />
          )}
          <span className="hidden xl:block">
            {isDarkMode ? 'الوضع الفاتح' : 'الوضع المظلم'}
          </span>
        </button>

        {/* Settings */}
        <Link
          to="/settings"
          className="w-full flex items-center px-3 py-3 text-xl rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900 transition-colors"
        >
          <Cog6ToothIcon className="ml-4 h-7 w-7" />
          <span className="hidden xl:block">الإعدادات</span>
        </Link>

        {/* User profile */}
        {currentUser && (
          <div className="mt-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full cursor-pointer transition-colors">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={currentUser.avatar || `https://ui-avatars.com/api/?name=${currentUser.name}&background=fb3a5d&color=fff`}
                  alt={currentUser.name}
                />
              </div>
              <div className="mr-3 min-w-0 flex-1 hidden xl:block">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
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
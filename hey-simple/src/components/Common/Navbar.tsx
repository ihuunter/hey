import React from 'react'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAppStore } from '../../store/useAppStore'

const Navbar: React.FC = () => {
  const { toggleSidebar } = useAppStore()

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Center - Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-brand-500">Hey</h1>
        </div>

        {/* Right side - Search */}
        <button className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
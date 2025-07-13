import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useAppStore } from '../../store/useAppStore'

const Layout: React.FC = () => {
  const { isDarkMode, isSidebarOpen, setSidebarOpen } = useAppStore()

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-black min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden">
          <Navbar />
        </div>

        <div className="lg:flex">
          {/* Sidebar */}
          <div className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 transform
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:relative lg:translate-x-0 lg:flex lg:flex-col lg:w-64
            transition-transform duration-300 ease-in-out
          `}>
            <Sidebar />
          </div>

          {/* Mobile sidebar overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <div className="flex-1 lg:flex lg:flex-col">
            <main className="flex-1">
              <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <Outlet />
              </div>
            </main>
          </div>

          {/* Right sidebar for larger screens */}
          <div className="hidden xl:block xl:w-80">
            <div className="sticky top-0 p-4">
              {/* Trending or suggestions can go here */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  الاتجاهات
                </h3>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    #برمجة • 1,234 منشور
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    #تطوير_الويب • 856 منشور
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    #تقنية • 642 منشور
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
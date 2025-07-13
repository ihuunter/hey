import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useAppStore } from '../../store/useAppStore'

const Layout: React.FC = () => {
  const { isDarkMode, isSidebarOpen, setSidebarOpen } = useAppStore()

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Mobile Header */}
        <div className="lg:hidden">
          <Navbar />
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <div className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-black transform border-r border-gray-200 dark:border-gray-700
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:relative lg:translate-x-0 lg:col-span-3 xl:col-span-2
            transition-transform duration-300 ease-in-out
          `}>
            <div className="h-full overflow-y-auto">
              <Sidebar />
            </div>
          </div>

          {/* Mobile sidebar overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <main className="lg:col-span-6 xl:col-span-6">
            <div className="border-r border-gray-200 dark:border-gray-700 min-h-screen">
              <Outlet />
            </div>
          </main>

          {/* Right sidebar */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-4">
            <div className="sticky top-0 p-4 space-y-4">
              {/* Search */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="البحث"
                    className="w-full pl-4 pr-10 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl border-0 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-500"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Trending */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                  الاتجاهات لك
                </h3>
                <div className="space-y-3">
                  {[
                    { topic: 'برمجة', posts: '1,234' },
                    { topic: 'تطوير_الويب', posts: '856' },
                    { topic: 'تقنية', posts: '642' },
                    { topic: 'ذكاء_اصطناعي', posts: '423' },
                  ].map((trend, index) => (
                    <div key={index} className="hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-colors">
                      <p className="text-sm text-gray-500 dark:text-gray-400">متداول في التقنية</p>
                      <p className="font-semibold text-gray-900 dark:text-white">#{trend.topic}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{trend.posts} منشور</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who to follow */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                  من تتابع
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'أحمد محمد', username: 'ahmed_dev', bio: 'مطور ويب' },
                    { name: 'سارة علي', username: 'sara_designer', bio: 'مصممة UI/UX' },
                    { name: 'محمد سعد', username: 'mohammed_data', bio: 'عالم بيانات' },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${user.name}&background=fb3a5d&color=fff`}
                          alt={user.name}
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{user.name}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">@{user.username}</p>
                        </div>
                      </div>
                      <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                        متابعة
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Layout
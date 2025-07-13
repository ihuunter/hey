
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Common/Layout'
import Home from './components/Home'
import { Toaster } from 'sonner'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">استكشاف</h1>
              <p className="text-gray-600 dark:text-gray-400">قريباً...</p>
            </div>} />
            <Route path="notifications" element={<div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الإشعارات</h1>
              <p className="text-gray-600 dark:text-gray-400">قريباً...</p>
            </div>} />
            <Route path="bookmarks" element={<div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">المحفوظات</h1>
              <p className="text-gray-600 dark:text-gray-400">قريباً...</p>
            </div>} />
            <Route path="profile/:username" element={<div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الملف الشخصي</h1>
              <p className="text-gray-600 dark:text-gray-400">قريباً...</p>
            </div>} />
            <Route path="settings" element={<div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الإعدادات</h1>
              <p className="text-gray-600 dark:text-gray-400">قريباً...</p>
            </div>} />
          </Route>
        </Routes>
        
        {/* Toast notifications */}
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App

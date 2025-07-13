# Hey Simple - شبكة اجتماعية مبسطة

نسخة مبسطة من موقع Hey الاجتماعي مبنية باستخدام React و TypeScript و Supabase.

## المميزات ✨

- 🎨 **تصميم حديث**: واجهة مستخدم جميلة مع دعم الوضع المظلم
- 📱 **متجاوب**: يعمل على جميع الأجهزة (هواتف، أجهزة لوحية، أجهزة كمبيوتر)
- ⚡ **سريع**: مبني باستخدام Vite للتطوير السريع
- 🔥 **تقنيات حديثة**: React 19، TypeScript، TailwindCSS
- 🗄️ **قاعدة بيانات**: Supabase للبيانات والمصادقة
- 🌍 **دعم العربية**: واجهة باللغة العربية مع دعم RTL

## التقنيات المستخدمة 🛠️

- **React 19** - مكتبة واجهة المستخدم
- **TypeScript** - لكتابة كود آمن ومنظم
- **Vite** - أداة التطوير السريع
- **TailwindCSS** - لتصميم سريع وحديث
- **React Router** - للتنقل بين الصفحات
- **Zustand** - لإدارة الحالة العامة
- **Supabase** - قاعدة البيانات والمصادقة
- **Heroicons** - الأيقونات
- **Date-fns** - للتعامل مع التواريخ

## التشغيل السريع 🚀

### 1. تثبيت التبعيات
\`\`\`bash
npm install
\`\`\`

### 2. إعداد متغيرات البيئة
انسخ ملف البيئة وقم بتعبئة البيانات:
\`\`\`bash
cp .env.example .env
\`\`\`

ثم قم بتعديل ملف \`.env\` وأضف بيانات Supabase الخاصة بك.

### 3. تشغيل التطبيق
\`\`\`bash
npm run dev
\`\`\`

سيعمل التطبيق على: http://localhost:5173

## إعداد قاعدة البيانات (Supabase) 🗄️

### 1. إنشاء مشروع جديد
- اذهب إلى [Supabase](https://supabase.com)
- أنشئ حساب جديد أو سجل دخولك
- أنشئ مشروع جديد

### 2. إنشاء الجداول
قم بتشغيل هذا الـ SQL في Supabase SQL Editor:

\`\`\`sql
-- إنشاء جدول المستخدمين
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  bio TEXT,
  avatar TEXT,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء جدول المنشورات
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  author_username VARCHAR(50) NOT NULL,
  author_avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0
);

-- إنشاء جدول الإعجابات
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- إنشاء جدول التعليقات
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  author_username VARCHAR(50) NOT NULL,
  author_avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  likes_count INTEGER DEFAULT 0
);
\`\`\`

### 3. إضافة Row Level Security (RLS)
\`\`\`sql
-- تفعيل RLS للجداول
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة العامة
CREATE POLICY "Public read access" ON users FOR SELECT USING (true);
CREATE POLICY "Public read access" ON posts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON likes FOR SELECT USING (true);
CREATE POLICY "Public read access" ON comments FOR SELECT USING (true);
\`\`\`

## هيكل المشروع 📁

\`\`\`
hey-simple/
├── src/
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Layout.tsx      # تخطيط الصفحة الرئيسي
│   │   │   ├── Navbar.tsx      # شريط التنقل العلوي
│   │   │   └── Sidebar.tsx     # الشريط الجانبي
│   │   ├── Home/
│   │   │   ├── index.tsx       # الصفحة الرئيسية
│   │   │   └── CreatePost.tsx  # نموذج إنشاء منشور
│   │   └── Post/
│   │       └── PostCard.tsx    # بطاقة عرض المنشور
│   ├── lib/
│   │   └── supabase.ts         # إعداد Supabase
│   ├── store/
│   │   └── useAppStore.ts      # إدارة الحالة العامة
│   ├── App.tsx                 # التطبيق الرئيسي
│   └── main.tsx               # نقطة الدخول
├── .env.example               # مثال على متغيرات البيئة
└── README.md                  # هذا الملف
\`\`\`

## الأوامر المتاحة 🔧

- \`npm run dev\` - تشغيل التطبيق في وضع التطوير
- \`npm run build\` - بناء التطبيق للإنتاج
- \`npm run preview\` - معاينة النسخة المبنية
- \`npm run lint\` - فحص الكود

## المساهمة 🤝

مرحب بالمساهمات! يمكنك:
1. عمل Fork للمشروع
2. إنشاء فرع جديد للميزة الجديدة
3. إضافة التغييرات
4. إرسال Pull Request

## التطوير المستقبلي 🔮

- [ ] المصادقة والتسجيل
- [ ] رفع الصور
- [ ] التعليقات والردود
- [ ] البحث والاستكشاف
- [ ] الإشعارات المباشرة
- [ ] المتابعة والمتابعين
- [ ] الرسائل الخاصة

## الترخيص 📄

هذا المشروع مرخص تحت رخصة MIT.

---

صنع بـ ❤️ لمجتمع المطورين العرب

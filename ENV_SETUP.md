# إعداد متغيرات البيئة

## إنشاء ملف .env.local

أنشئ ملف `.env.local` في المجلد الجذر للمشروع وأضف المتغيرات التالية:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-change-in-production

# API Configuration
API_BASE_URL=https://ecommerce.routemisr.com/api/v1
NEXT_PUBLIC_API_BASE_URL=https://ecommerce.routemisr.com/api/v1

# Development Environment
NODE_ENV=development
```

## ملاحظات مهمة:

1. **NEXTAUTH_SECRET**: يجب أن يكون مفتاح سري قوي في الإنتاج
2. **NEXTAUTH_URL**: يجب أن يتغير حسب البيئة (development/production)
3. **API_BASE_URL**: عنوان الـ API الخارجي

## بعد إضافة الملف:

1. أعد تشغيل الخادم: `npm run dev`
2. تأكد من أن الملف `.env.local` في `.gitignore`


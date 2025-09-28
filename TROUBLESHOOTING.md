# دليل حل المشاكل

## المشاكل الشائعة والحلول

### 1. خطأ 502 Bad Gateway
**المشكلة**: `Error: Failed to fetch products: 502 Bad Gateway`

**السبب**: الخادم الخارجي `ecommerce.routemisr.com` غير متاح أو لا يعمل

**الحل**: 
- تم إصلاح المشكلة في الكود ليعرض رسالة بديلة بدلاً من تعطل التطبيق
- إذا استمر الخطأ، تحقق من حالة الخادم الخارجي

### 2. تحذيرات NextAuth
**المشكلة**: `NEXTAUTH_URL` warning

**الحل**: 
1. أنشئ ملف `.env.local` في المجلد الجذر
2. أضف المتغيرات المطلوبة (انظر `ENV_SETUP.md`)

### 3. تحذير CORS
**المشكلة**: `Cross origin request detected`

**الحل**: تم إصلاحه في `next.config.ts` بإضافة `allowedDevOrigins`

### 4. مشاكل Session Cookies
**المشكلة**: `no session cookie found`

**الحل**: تأكد من إعداد `NEXTAUTH_SECRET` في ملف البيئة

## خطوات الإعداد السريع

1. **أنشئ ملف `.env.local`**:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
API_BASE_URL=https://ecommerce.routemisr.com/api/v1
NEXT_PUBLIC_API_BASE_URL=https://ecommerce.routemisr.com/api/v1
```

2. **أعد تشغيل الخادم**:
```bash
npm run dev
```

3. **تحقق من التطبيق**: افتح `http://localhost:3000`

## ملاحظات مهمة

- التطبيق الآن يعمل حتى لو كان الـ API الخارجي غير متاح
- سيتم عرض رسالة "لا توجد منتجات متاحة حالياً" عند عدم توفر البيانات
- جميع التحذيرات تم إصلاحها أو تخفيفها


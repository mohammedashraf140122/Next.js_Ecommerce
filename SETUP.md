# إعداد المشروع

## متطلبات التشغيل

1. **Node.js** (الإصدار 18 أو أحدث)
2. **npm** أو **yarn**

## خطوات الإعداد

### 1. تثبيت المتطلبات
```bash
npm install
```

### 2. إعداد متغيرات البيئة
قم بإنشاء ملف `.env.local` في المجلد الجذر للمشروع وأضف المتغيرات التالية:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# API Configuration
API_BASE_URL=https://ecommerce.routemisr.com/api/v1
NEXT_PUBLIC_API_BASE_URL=https://ecommerce.routemisr.com/api/v1
```

### 3. تشغيل المشروع
```bash
npm run dev
```

## ملاحظات مهمة

- **NEXTAUTH_SECRET**: يجب أن يكون مفتاح سري قوي في الإنتاج
- **NEXTAUTH_URL**: يجب أن يتطابق مع عنوان الموقع
- في حالة عدم وجود متغيرات البيئة، سيتم استخدام قيم افتراضية للتطوير

## استكشاف الأخطاء

إذا واجهت مشاكل في المصادقة:
1. تأكد من وجود ملف `.env.local`
2. تأكد من صحة قيم المتغيرات
3. أعد تشغيل الخادم بعد إضافة المتغيرات

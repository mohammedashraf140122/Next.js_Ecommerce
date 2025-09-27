# 🛒 FreshCart Ecommerce  

A **modern and responsive ecommerce platform** built with **Next.js 14**, designed for high performance, scalability, and a smooth shopping experience.  

## 🌍 Live Demo  
🔗 **[Explore the Demo](https://next-js-ecommerce2.netlify.app/)**  

---

## ✨ Core Features  

- 🔐 **Secure Authentication** – Integrated with NextAuth.js for login & registration  
- 🏠 **Dynamic Homepage** – Interactive sliders and product showcases  
- 🛍️ **Product Pages** – Detailed product views with a modern, responsive UI  
- 📱 **Mobile-First Design** – Optimized layouts for all devices  
- 🎨 **Modern UI Kit** – Built with Tailwind CSS + shadcn/ui components  
- 🔄 **Category Carousel** – Smooth, ticker-style category browsing  
- ⚡ **Performance Optimized** – Next.js Image & SSR for blazing speed  
- 🎯 **Error Handling** – Custom 404 and error states for a polished UX  

---

## 🚀 Getting Started  

### Prerequisites  
- **Node.js 18+**  
- **npm / yarn / pnpm** package manager  

### Installation  

```bash
# Clone repository
git clone <repository-url>
cd ecommerce

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
```

👉 Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# API Configuration
API_BASE_URL=https://ecommerce.routemisr.com/api/v1
NEXT_PUBLIC_API_BASE_URL=https://ecommerce.routemisr.com/api/v1
```

**Important**: Replace `your-secret-key-here-change-this-in-production` with a strong secret key for production use.  

---

## 🛠️ Tech Stack  

- **Framework**: Next.js 14 (App Router)  
- **Authentication**: NextAuth.js  
- **Styling**: Tailwind CSS + shadcn/ui  
- **Forms**: React Hook Form + Zod validation  
- **Icons**: Font Awesome  
- **Slider**: Swiper.js  
- **Language**: TypeScript  
- **API**: External ecommerce REST APIs  

---

## 📂 Project Structure  

```
src/
├── app/                  # App Router pages & layouts
│   ├── _components/      # Shared UI components
│   ├── product-details/  # Product details pages
│   └── globals.css       # Global styles
├── apis/                 # API integration helpers
└── assets/               # Static images & icons
```

---

## 🎨 UI Highlights  

- **Navbar** – Responsive navigation with mobile support  
- **Hero Slider** – Auto-play with navigation controls  
- **Category Carousel** – Horizontal, ticker-style scrolling  
- **Product Card** – Hover effects with quick interactions  
- **Auth Forms** – Login & Register with full validation  

---

## 🌐 API Endpoints  

- **Products** → `https://ecommerce.routemisr.com/api/v1/products`  
- **Categories** → `https://ecommerce.routemisr.com/api/v1/categories`  
- **Single Product** → `https://ecommerce.routemisr.com/api/v1/products/{id}`  

---

## 📦 Scripts  

```bash
npm run dev       # Start development
npm run build     # Build for production
npm run start     # Launch production server
npm run lint      # Run ESLint checks
```

---

## 🚢 Deployment  

Deploy seamlessly on **Vercel** (creators of Next.js).  

[![Deploy with netlify.com/](https://www.netlify.com/)]

---

## 🛣️ Roadmap  

🚀 Planned Features for the upcoming releases:  

- 🛒 **Shopping Cart**  
  - Add products to cart  
  - Update quantities  
  - Remove items  
  - Persist cart across sessions  

- 💳 **Checkout & Payments**  
  - Step 1: Enter shipping address  
  - Step 2: Select payment method (Stripe / PayPal)  
  - Step 3: Review & confirm order  

- 📦 **Order Management**  
  - Track order status  
  - View purchase history  

- 👤 **User Dashboard**  
  - Profile management  
  - Saved products/favorites  

- 🛠️ **Admin Panel**  
  - Manage products, categories, and inventory  
  - Order management & reports  

---

💡 **FreshCart** is built with ❤️ using **Next.js** and modern web technologies.  

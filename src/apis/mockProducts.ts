import { Product } from "@/types/product.type";

const mockProducts: Product[] = [
  {
    _id: "product1",
    title: "طماطم طازجة",
    slug: "fresh-tomatoes",
    description: "طماطم طازجة من المزرعة المحلية",
    quantity: 50,
    price: 15.99,
    imageCover: "/next.svg",
    images: ["/next.svg", "/vercel.svg"],
    sold: 25,
    ratingsQuantity: 12,
    ratingsAverage: 4.5,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    id: "product1",
    category: {
      _id: "cat1",
      name: "خضروات",
      slug: "vegetables",
      image: "/next.svg",
    },
    brand: {
      _id: "brand1",
      name: "كوكاكولا",
      slug: "coca-cola",
      image: "/next.svg",
    },
    subcategory: [
      {
        _id: "sub1",
        name: "طماطم",
        slug: "tomatoes",
        category: "cat1",
      },
    ],
  },
  {
    _id: "product2",
    title: "تفاح أحمر",
    slug: "red-apples",
    description: "تفاح أحمر حلو ومقرمش",
    quantity: 30,
    price: 22.50,
    imageCover: "/next.svg",
    images: ["/next.svg", "/vercel.svg"],
    sold: 18,
    ratingsQuantity: 8,
    ratingsAverage: 4.2,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    id: "product2",
    category: {
      _id: "cat2",
      name: "فواكه",
      slug: "fruits",
      image: "/next.svg",
    },
    brand: {
      _id: "brand2",
      name: "بيبسي",
      slug: "pepsi",
      image: "/next.svg",
    },
    subcategory: [
      {
        _id: "sub2",
        name: "تفاح",
        slug: "apples",
        category: "cat2",
      },
    ],
  },
  {
    _id: "product3",
    title: "قهوة عربية",
    slug: "arabic-coffee",
    description: "قهوة عربية أصيلة من أجود أنواع البن",
    quantity: 20,
    price: 45.00,
    imageCover: "/next.svg",
    images: ["/next.svg", "/vercel.svg"],
    sold: 12,
    ratingsQuantity: 15,
    ratingsAverage: 4.8,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    id: "product3",
    category: {
      _id: "cat3",
      name: "مشروبات",
      slug: "drinks",
      image: "/next.svg",
    },
    brand: {
      _id: "brand3",
      name: "نسكافيه",
      slug: "nescafe",
      image: "/next.svg",
    },
    subcategory: [
      {
        _id: "sub3",
        name: "قهوة",
        slug: "coffee",
        category: "cat3",
      },
    ],
  },
];

export default function getMockProducts(): Product[] {
  return mockProducts;
}

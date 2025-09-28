import { Category } from "@/types/category.type";

const mockCategories: Category[] = [
  {
    _id: "cat1",
    name: "خضروات",
    slug: "vegetables",
    image: "/next.svg",
  },
  {
    _id: "cat2",
    name: "فواكه",
    slug: "fruits",
    image: "/next.svg",
  },
  {
    _id: "cat3",
    name: "مشروبات",
    slug: "drinks",
    image: "/next.svg",
  },
];

export default function getMockCategories(): Category[] {
  return mockCategories;
}


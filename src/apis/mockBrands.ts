import { Brand } from "@/types/brand.type";

const mockBrands: Brand[] = [
  {
    _id: "brand1",
    name: "كوكاكولا",
    slug: "coca-cola",
    image: "/next.svg",
  },
  {
    _id: "brand2",
    name: "بيبسي",
    slug: "pepsi",
    image: "/next.svg",
  },
  {
    _id: "brand3",
    name: "نسكافيه",
    slug: "nescafe",
    image: "/next.svg",
  },
];

export default function getMockBrands(): Brand[] {
  return mockBrands;
}


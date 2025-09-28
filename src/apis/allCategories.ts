import { Category } from "@/types/category.type";
import getMockCategories from "./mockCategories";

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export default async function getAllCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 300 },
      headers: {
        "Accept": "application/json",
      },
    });
    
    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Categories API unavailable: ${response.status} ${response.statusText} - Using mock data`);
      }
      return getMockCategories();
    }
    
    const result = await response.json();
    return result.data as Category[];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Categories API failed - Using mock data:", error);
    }
    return getMockCategories();
  }
}

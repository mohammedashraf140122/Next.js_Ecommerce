import { Brand } from "@/types/brand.type";
import getMockBrands from "./mockBrands";

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export default async function getAllBrands() {
  try {
    const response = await fetch(`${API_BASE_URL}/brands`, {
      next: { revalidate: 300 },
      headers: { "Accept": "application/json" },
    });
    
    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Brands API unavailable: ${response.status} ${response.statusText} - Using mock data`);
      }
      return getMockBrands();
    }
    
    const result = await response.json();
    return result.data as Brand[];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Brands API failed - Using mock data:", error);
    }
    return getMockBrands();
  }
}

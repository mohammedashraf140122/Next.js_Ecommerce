import { Product } from "@/types/product.type";
import getMockProducts from "./mockProducts";

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export default async function getAllProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      // Log error in development only, don't spam console in production
      if (process.env.NODE_ENV === 'development') {
        console.warn(`API temporarily unavailable: ${response.status} ${response.statusText} - Using mock data`);
      }
      // Return mock data instead of empty array for better user experience
      return getMockProducts();
    }
    
    const result = await response.json();
    return result.data as Product[];
  } catch (error) {
    // Log error in development only
    if (process.env.NODE_ENV === 'development') {
      console.warn("API connection failed - Using mock data:", error);
    }
    // Return mock data instead of empty array for better user experience
    return getMockProducts();
  }
}

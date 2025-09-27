import { OrdersResponse } from "@/types/order.type";

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "https://ecommerce.routemisr.com/api/v1";

export async function getUserOrders(token: string, userId: string): Promise<OrdersResponse | null> {
  try {
    console.log("[getUserOrders] API_BASE_URL:", API_BASE_URL);
    console.log("[getUserOrders] token:", token);
    console.log("[getUserOrders] userId:", userId);
    if (!token) {
      throw new Error("Authentication token not found");
    }

    if (!userId) {
      throw new Error("User ID not found");
    }

    const apiUrl = `${API_BASE_URL}/orders/user/${userId}`;
    console.log("[getUserOrders] Fetching user orders from:", apiUrl);
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Orders API error response:", errorText);
      if (contentType && contentType.includes("application/json")) {
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.message || `Failed to fetch orders: ${response.status}`);
        } catch {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }
      } else {
        throw new Error(`Failed to fetch orders: ${response.status}. Response was not JSON.`);
      }
    }

    if (contentType && contentType.includes("application/json")) {
      const data: OrdersResponse = await response.json();
      return data;
    } else {
      const text = await response.text();
      console.error("Unexpected orders response:", text);
      throw new Error("Orders API did not return JSON");
    }
  } catch (error) {
    console.error("Error fetching user orders:", error);
    // Return null on error to match other API helpers and let callers handle it
    return null;
  }
}
